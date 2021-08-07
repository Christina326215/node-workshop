// promise 版本

const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

let stockCode = "";
new Promise((resolve, reject) => {
  fs.readFile("stock.txt", "utf-8", (err, stockCode) => {
    if (err) {
      reject(err);
    } else {
      resolve(stockCode.trim());
    //   resolve(stockCode);
    }
  });
})
.then((stockCode)=>{
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
        params:{
            response:"json",
            Date:moment().format("YYYYMMDD"),
            stockNo:stockCode,
        },
    })
})
.then((response)=>{
    // console.log(response.data);
    console.log(response.data.title);
})
.catch((err)=>{
    console.log(err);
})

