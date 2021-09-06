const fs = require("fs/promises");

console.log(__dirname);

fs.readFile("stock.txt","utf-8").then((result)=>{
    console.log(result);
})

// /Users/christina/node-workshop/dirname
// 1234