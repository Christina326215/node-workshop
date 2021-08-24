// client端
const http = require("http");

// 建立server，而server端回應給client端
const server = http.createServer((req, res) => {
    let url = req.url
    switch(url){
        case "/":
            res.end("Hello Simple Web");
            break;
        case "/about":
            res.end("<h1>About us</h1>");
            break;
    }
});


// port3500
server.listen(3500, () => {
    console.log("我們的 web server 啟動了～");
});