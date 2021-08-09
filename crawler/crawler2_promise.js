// promise 版本

const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

// 1. 建立新Promise物件，在建構式函式中加入兩個參數來處理成功或失敗的事件處理。
new Promise((resolve, reject) => {
  // 2. 建立讀取檔案(非同步工作)，處於 pending 狀態。
  fs.readFile("stock.txt", "utf-8", (err, stockCode) => {
    if (err) {
      // 4. 讀取檔案失敗，利用 reject 把結果 return 出去。
      reject(err);
    } else {
      // 3. 讀取檔案成功，利用 resolve 把結果 return 出去。
      resolve(stockCode.trim());
    //   resolve(stockCode);
    }
  });
})
// 5. 讀取檔案 resolve 成功之後，會用 then 繼續執行工作。
.then((stockCode)=>{
    // 6. 從 stock.txt 檔案讀取到資料後，就可以再用 axios (亦為建立新Promise物件)， return 取得網站資訊，此時為 pending 狀態。
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY",{
        params:{
            response:"json",
            date:moment().format("YYYYMMDD"),
            stockNo:stockCode,
        },
    })
})
// 7. then 資料取得後，傳回 return 後的資料。
.then((response)=>{
    // console.log(response.data);
    console.log(response.data.title);
})
.catch((err)=>{
    console.log(err);
})

