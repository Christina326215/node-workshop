// 測試1: for loop
function double(i){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(i*2);
        },0);
    });
};

(async () => {
    let data1=[1,3,5,7];
    for (let i=0; i<data1.length; i++){
        data1[i] = await double(data1[i]);
    } 
    console.log("test 1: ", data1);
})();

// test 1:  [ 2, 6, 10, 14 ]