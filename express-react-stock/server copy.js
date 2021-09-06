// express 注重由上往下執行(順序很重要！)，而且遇到response就會結束。
const express = require("express");
const connection = require("./utils/db");

// 利用express 建立了一個express application
let app = express();

// 處理 cors 問題，要放在所有路由中間件的前面。
const cors = require("cors");
app.use(cors());

// 中間件
// 若沒有next()，程式會呈現pending狀態，直到timeout逾時。
app.use((request, response, next) => {
  let current = new Date();
  console.log(`Hey, 有人來訪問囉 at ${current.toISOString()}`);
  next();
});

// 中間件
app.use((request, response, next) => {
  console.log("Haha, 我是第二個中間件");
  next();
});

// http method: get, post, put, patch, delete......
// router 路由 -> 特殊中間件(網址對了才會進來)
app.get("/", function (request, response, next) {
  response.send("Hi, this is my first express, with nodemon.");
  next();
});

// router 路由 -> 特殊中間件(網址對了才會進來)
app.get("/about", function (request, response, next) {
  response.send("Hello, it’s great to meet you.");
});

// router 路由 -> 特殊中間件(網址對了才會進來)
// stockCode get api
app.get("/stock", async (request, response, next) => {
  let result = await connection.queryAsync("SELECT * FROM stock");
  // 以json格式回傳
  response.json(result);
});

// /stock/2330 ===> stockCode = 2330
app.get("/stock/:stockCode", async(req, res, next) => {
  // req.params.stockCode
  let result = await connection.queryAsync(
    "SELECT * FROM stock_price WHERE stock_id=?",
    [req.params.stockCode]
  );
  res.json(result);
});

// 輸入一個未設定的網址，出現錯誤訊息。
// 錯誤處理放在所有路由的最下面。
app.use((req, res, next) => {
  res.status(404).json({message: "404 NOT FOUND"});
});

app.listen(3500, async function () {
  // 因為改成用 pool ，所以不需要手動建立連線。
  // await connection.connectAsync();
  console.log("我們的 web server 啟動了～");
});

// ![](middleware.png)
