// async await 版本

const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

// async 非同步，是暫停的限制範圍。
async function crawlStock() {
  try {
    // await 暫停鍵
    let stockCode = await new Promise((resolve, reject) => {
      fs.readFile("stock.txt", "utf-8", (err, stockCode) => {
        if (err) {
          reject(err);
        } else {
          // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
          // trim 移除前後的空白字元，包括換行
          resolve(stockCode.trim());
          //   resolve(stockCode);
        }
      });
    });

    // await 暫停鍵
    let response = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: "json",
          Date: moment().format("YYYYMMDD"),
          stockNo: stockCode,
        },
      }
    );
    // console.log(response.data);
    console.log(response.data.title);
  } catch (err) {
    console.log(err);
    // console.error(e);
    // console.warn();
    // console.info();
    // console.trace();
    // console.debug();
  } finally {
    console.log("got the data");
  }
}

crawlStock();
