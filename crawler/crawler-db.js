// async await 版本

const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

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
        resolve(stockCode);
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
    let dbResult = await validStockCode(stockCode);
    // 3. 若確認在我們的服務範圍內，就可以從證券交易所以axios get到相關資料。
    let response = await getStockData(stockCode);

    const twseStockData = response.data;
    if (twseStockData.stat !== "OK") {
      throw "無法取得資料";
    }

    // 資料格式轉換
    let dataInserted = twseStockData.data.map((data) => {
      data = data.map((value) => {
        return value.replace(/,/g, "");
      });
      data[0] = parseInt(data[0].replace(/\//g, ""), 10) + 19110000;
      data.unshift(stockCode);
      return data;
    });
    // console.log(dataInserted);

    // 4. 取得資料後，存回stock資料庫的stock_price資料表。
    let insertResult = await dataBaseStorage(dataInserted);
    console.log(insertResult);

  } catch (error) {
    console.error(error);

  } finally {
    connection.end();
  }
}

stockCrawler();
