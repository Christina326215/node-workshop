// async await + db 版本

const axios = require("axios");
const moment = require("moment");

const fs = require("fs");
// const { readFile } = require("fs");
// readFile("stock.txt", "utf8", callback)

const mysql = require("mysql");
require("dotenv").config();

// 設定連線資料
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// 檢查是否連線
connection.connect((err) => {
  if (err) {
    console.error("資料庫無法連線", err);
  }
});

// 建立function readStockCode，用來讀取檔案stock.txt的內容並傳回股票代碼。
function readStockCode () {
  return new Promise((resolve,reject)=>{
    fs.readFile("stock.txt","utf-8",(error,stockCode)=>{
      if(error){
        reject(error);
      }else{
        resolve(stockCode.trim());
      }
    });
  });
};

// 到資料庫檢查檢查stockCode是否符合服務範圍。
function validStockCode(stockCode) {
  return new Promise((resolve,reject)=>{
    connection.query(
      "SELECT * FROM stock WHERE stock_id = ?",
      [stockCode],
      function (error,result,fields){
        if(error){
          reject(error);
        }
        if(result.length === 0){
          reject("抱歉，資料庫查無此股票代碼，不在此服務範圍內！");
        }
        resolve(result);
      }
    );
  });
};

// 若確定是資料庫服務範圍內，就能夠利用axios抓取json資料。
function getStockData(stockNo) {
  return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: "json",
      date: moment().format("YYYYMMDD"),
      stockNo: stockNo,
    },
  });
}

// 將資料 insert into 資料庫
// 取得資料後，存回stock資料庫的stock_price資料表。
function dataBaseStorage(dataInserted) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
      [dataInserted],
      function (error, result, fields) {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
}



async function stockCrawler() {
  try {
    // 1. 讀 stock.txt 把股票代碼讀進來。
    let stockCode = await readStockCode();
    // 2. 檢查是否在我們資料庫的服務範圍內。
    let dbResults = await validStockCode(stockCode);

    if (dbResults.length === 0) {
      // console.warn("此股票代碼不在服務範圍內");
      // return;
      throw "此股票代碼不在服務範圍內";
    }
    console.info("在資料庫有查到資料");

    // 3. 若確認在我們的服務範圍內，就可以從證券交易所以axios get到相關資料。
    let response = await getStockData(stockCode);

    // 4. 取得資料後，先檢查資料，並進行資料格式轉換。
    const twseStockData = response.data;
    if (twseStockData.stat !== "OK") {
      throw "無法取得正確資料";
    }

    // [
    //   '日期',     '成交股數',
    //   '成交金額', '開盤價',
    //   '最高價',   '最低價',
    //   '收盤價',   '漲跌價差',
    //   '成交筆數'
    // ]

    // 資料格式轉換(針對 data 裡的每一組做資料處理)。
    let dataInserted = twseStockData.data.map((item) => {
      // 處理千位符: 將千位符拿掉。
      item = item.map((value) => {
        return value.replace(/,/g, "");
      });

      // 處理日期: 民國年轉西元年。
      // 處理 + - ===> 交給 parseInt 轉數字處理
      item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000;

      // 把 stock_id 放到陣列最前面，以便輸入到資料庫。
      item.unshift(stockCode);

      return item;
    });
    console.log(dataInserted);

    // 5. 資料格式轉換之後存回stock資料庫的stock_price資料表。
    let insertResult = await dataBaseStorage(dataInserted);
    console.log(insertResult);

  } catch (error) {
    console.error(error);

  } finally {
    connection.end();
  }
}

stockCrawler();
