console.log(1);

setImmediate(()=>{
    console.log("Imme");
});
//Timer Q > Check Q

setTimeout(()=>{
    //--> Macro Q
    console.log(2);  
    //立刻執行resolve，篤定成功的情況下可以只用一行直接執行。
    Promise.resolve(7).then((result)=>{
        console.log(result);   // 7--> Micro Q
        //遇到有Micro Q 出現的時候，可以讓 Micro Q 插隊先執行它，因為Micro Q 有優先權。
    });
},0);

new Promise((resolve,reject)=>{
    console.log(4);
    resolve(5);    
}).then((result)=>{
    //--> Micro Q
    console.log(result);  //5
});

setTimeout(()=>{
    //--> Macro   Q
    console.log(6);   
},0);

console.log("end");

// 答案：1(同) -> 4(同) ->  end(同) ->  5(micro Q) ->  2(macro Timer Q) ->  7(micro Q) ->  6(macro Timer Q) ->  Imme(Check Q)
// Quere採先進先出法。
// Micro Q 會先執行，Macro Q後執行。
// 每做完一個 Macro Q ，都會都要回頭檢查一次 Micro Q 有沒有要做。
//Timer Q > Check Q (setImmediate)
// https://blog.csdn.net/biraotian/article/details/111634611