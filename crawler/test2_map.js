// 測試2: map
function double(i){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(i*2);
        },0);
    });
};

let data2=[1,3,5,7];
data2 = data2.map(async (d) => {
    let result = await double(d);
    return result;
});
console.log("test 2: ", data2);

data2.map()

// test 2:  [
//   Promise { <pending> },
//   Promise { <pending> },
//   Promise { <pending> },
//   Promise { <pending> }
// ]

// 只要是可以接收函式作為參數，或是回傳函式作為輸出的函式，我們就稱為高階函式。