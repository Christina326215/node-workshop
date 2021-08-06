let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

//建立function，來執行接下來的doWork工作。
let doWork = function (job, timer, isOK) {
  //建立promise物件，並且函式中有兩個參數，分別代表成功與失敗。
  return new Promise((resolve, reject) => {
    console.log("in promise");
    setTimeout(() => {
      let dt = new Date();
      if (isOK) {
        // 成功 isOk = true
        resolve(`完成工作: ${job} at ${dt.toISOString()}`);
      } else {
        // 失敗 isOk = false
        reject(`失敗了 ${job}`);
      }
    }, timer);
  });
};

//開始呼叫函式，執行doWork工作。
let job1_1 = doWork("刷牙", 3000, true);
console.log(job1_1);
job1_1.then(
  function (resolve) {
    console.log("第 1 個函式被呼叫了", resolve);
  },
  function (reject) {
    console.log("第 2 個函式被呼叫了", reject);
  }
);

let job1_2 = doWork("刷牙", 3000, false);
console.log(job1_2);
job1_2.then(
  function (resolve) {
    console.log("第 1 個函式被呼叫了", resolve);
  },
  function (reject) {
    console.log("第 2 個函式被呼叫了", reject);
  }
);
