// async await 版本

const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

// let stockCode = "";
async function crawlStock() {
  try {
    let stockCode = await new Promise((resolve, reject) => {
      fs.readFile("stock.txt", "utf-8", (err, stockCode) => {
        if (err) {
          reject(err);
        } else {
          resolve(stockCode.trim());
        //   resolve(stockCode);
        }
      });
    });
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
  } finally {
    console.log("got the data");
  }
}

crawlStock();
