const express = require("express");

// 利用express 建立了一個express application
let app = express();

// http method: get, post, put, patch, delete......
app.get("/",function(request, response,next){
    response.send("hello, this is my first express.");
});

app.get("/about",function(request, response,next){
    response.send("Hello, it’s great to meet you.");
});

app.listen(3000, function(){
    console.log("我們的 web server 啟動了～");
});


