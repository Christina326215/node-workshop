// express 注重由上往下執行(順序很重要！)，而且遇到response就會結束。
const express = require("express");
const connection = require("./utils/db");

// 利用express 建立了一個express application
let app = express();

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

app.listen(3000, async function () {
    await connection.connectAsync();
  console.log("我們的 web server 啟動了～");
});
