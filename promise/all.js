const { isBuffer } = require("util");

let doWorkPromise = function (job, isOK) {
  return new Promise((resolve, reject) => {
    let timer = Math.floor(Math.random() * 5000);
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

let job1Promise = doWorkPromise("讀檔案", true);
let job2Promise = doWorkPromise("買海底撈", true);
let job3Promise = doWorkPromise("寫作業", true);

// 三個工作在同一時間點開始做，並回傳每個工作完成的時間。
// Promise.all([job1Promise, job2Promise, job3Promise]).then((response) => {
//   console.log(response);
// });

// 三個工作在同一時間點開始做，只回傳第一個工作完成的時間。
Promise.race([job1Promise, job2Promise, job3Promise]).then((response) => {
  console.log(response);
});