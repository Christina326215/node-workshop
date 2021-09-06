const fs = require("fs/promises");
const path = require("path");

console.log(__dirname);

// 我人在 dirname/ 的時候，執行 node sub/second.js 是可以讀得到 stock.txt。
// 我人已經在 dirname/sub 裡了， node second.js 卻讀不到。

// readFile 時，不是從這個程式本身的位置來出發，而是從你下執行指令 node 的位置開始找。
// 從頭到尾， second.js 跟 stock.txt 的相對位置不重要。
// 重要的是你在哪里下 node second.js 指令。

// __dirname: /Users/christina/node-workshop/dirname/sub

// /Users/christina/node-workshop/dirname/sub/../stock.txt
// ==> /Users/christina/node-workshop/dirname/stock.txt

// let filepath = __dirname + "/../" + "stock.txt";
// let filepath = [__dirname, "..", "stock.txt"].join("/");
let filepath = path.join(__dirname, "..", "stock.txt")
fs.readFile(filepath,"utf-8").then((result)=>{
    console.log(result);
})

// 結果得到：
// /Users/christina/node-workshop/dirname/sub
// 1234

