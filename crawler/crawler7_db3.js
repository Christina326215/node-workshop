// 建立utils資料夾及模組，使用module.exports的方式，分別處理資料庫連線與資料格式轉換。

const fs = require("fs/promises");

// 資料庫連線
const connection = require("./utils/db");

const axios = require("axios");
// 資料格式轉換
const { processStockDay } = require("./utils/TWSEDataProcessor");

const moment = require("moment");

(async () => {
  try {
    // 1. 讀 stock.txt 把股票代碼讀進來。
    let stockCode = await fs.readFile("stock.txt", "utf-8");
    // console.log(stockCode);

    // 2. 檢查是否在我們資料庫的服務範圍內。
    await connection.connectAsync();
    let dbResults = await connection.queryAsync(
      "SELECT * FROM stock WHERE stock_id = ?",
      [stockCode]
    );
    console.log(dbResults);

    if (dbResults.length === 0) {
        // console.warn("此股票代碼不在服務範圍內");
        // return;
        throw "此股票代碼不在服務範圍內";
      }
    
    console.info("在資料庫有查到資料");

    // 3. 若確認在我們的服務範圍內，就可以從證券交易所以axios get到相關資料。
    let response = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: "json",
          date: moment().format("YYYYMMDD"),
          stockNo: stockCode, 
        },
      }
    );
    const twseData = response.data;
    if (twseData.stat !== "OK") {
      throw "無法取得正確資料";
    }

    // 4. 取得資料後，先檢查資料，並進行資料格式轉換。
    let dataInserted = processStockDay(stockCode, twseData.data);

    // 5. 資料格式轉換之後存回stock資料庫的stock_price資料表。
    let insertResult = await connection.queryAsync(
      "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
      [dataInserted]
    );
    console.log(insertResult);
  } catch (e) {
    console.error(e);
  } finally {
    connection.end();
  }
})();