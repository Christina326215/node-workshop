let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
// 刷牙 -> 吃早餐 -> 寫功課

let doWork = function (job, timer, isOK) {
  return new Promise((resolve, reject) => {
    // 模擬一個非同步工作
    console.log("in promise");
    setTimeout(() => {
      let dt = new Date();
      if (isOK) {
        resolve(`完成工作: ${job} at ${dt.toISOString()}`);
      } else {
        reject(`失敗了 ${job}`);
      }
    }, timer);
  });
};

// 解決: 接續做的工作
// ---> 動作如果要接續著做，只能把下一個動作放在上一個動作的 callback
//   --> callback hell

let job1 = doWork("刷牙", 3000, true);
job1
  .then((result) => {
    console.log("第 1 個函式被呼叫了", result);
    return 1;
    // 即使我們回傳的是數字，還是會包成 promise 物件
    // Promise.resolve(1)
  })
  .then((result) => {
    console.log("第 2 個 then", result);
  })
  .catch((error) => {
    // 捕捉錯誤
    console.log("第 2 個函式被呼叫了", error);
  })
  .finally(() => {
    // 無論成功或失敗都會在這裡
    console.log("finally");
  });

// let p2 = job1.then(() => {
//   //處理成功的情況
// });
// // p2 也是一個 promise 物件
// let p3 = p2.catch((error) => {});
// // p3 也會是一個 promise 物件
// p3.finally(() => {
//   // 不管成功或失敗，都會執行這裡
// });

// 然後做什麼是（兩個參數：第一個負責成功、第二個負責失敗）
// 會回傳一個 Promise
// Promise.then;

// 負責捕捉失敗
// 也會回傳 promise
// Promise.catch;