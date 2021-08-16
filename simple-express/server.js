const express = require("express");

// 利用express 建立了一個express application
let app = express();

app.use((request,response,next) => {
    let current = new Date();
    console.log(`Hey, 有人來訪問囉 at ${current.toISOString()}`);
    next();
})

app.use((request,response,next) => {
    console.log("Haha, 我是第二個中間件");
    next();
})

// http method: get, post, put, patch, delete......
app.get("/",function(request, response,next){
    response.send("hello, this is my first express, with nodemon.");
    next();
});

app.get("/about",function(request, response,next){
    response.send("Hello, it’s great to meet you.");
});

app.listen(3000, function(){
    console.log("我們的 web server 啟動了～");
});


