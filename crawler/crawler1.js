
const axios = require("axios");
const moment = require("moment");

// console.log(moment().format("YYYYMMDD"));
axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
    params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: "2618",
    },
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });  

      