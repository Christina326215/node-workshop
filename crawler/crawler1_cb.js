// callback 版本

const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

fs.readFile("stock.txt", "utf-8", (err, stockCode) => {
    if (err) {
      console.error(err);
    } else {
      axios
        .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
          params: {
            response: "json",
            date: moment().format("YYYYMMDD"),
            stockNo: stockCode.trim(),
            // stockNo: stockCode,
          },
        })
        .then((response) => {
          // console.log(response.data);
          console.log(response.data.title);
        });
    }
  });

  