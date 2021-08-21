// 測試4: forEach
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