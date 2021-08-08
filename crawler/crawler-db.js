// async await 版本

const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
// 只需要 require
require("dotenv").config();

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

    const mysql = require("mysql");

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  connection.connect((err) => {
    if (err) {
      console.error("資料庫連不上",err);
    }
  });

  // 不關閉連線，認為程式一直在執行
  connection.end();

//     let response = await axios.get(
//       "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
//       {
//         params: {
//           response: "json",
//           Date: moment().format("YYYYMMDD"),
//           stockNo: stockCode,
//         },
//       }
//     );
//     // console.log(response.data);
//     console.log(response.data.title);
//   } catch (err) {
    // console.log(err);
  } finally {
    // console.log("got the data");
  }
}

crawlStock();
