// 測試3: forEach
function double(i){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(i*2);
        },0);
    });
};

let data3=[1,3,5,7];
data3.forEach(async (d,i) => {
    data3[i] = await double(d);
});
console.log("test 3: ", data3);

// test 3:  [ 1, 3, 5, 7 ]

// 只要是可以接收函式作為參數，或是回傳函式作為輸出的函式，我們就稱為高階函式。