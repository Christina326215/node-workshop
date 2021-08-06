let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
// 刷牙 -> 吃早餐 -> 寫功課

let doWork = function (job, timer, isOK) {
  return new Promise((resolve, reject) => {
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

let job1 = doWork("刷牙", 3000, true);
job1.then(
  (result) => {
    console.log("第 1 個函式被呼叫了", result);
  },
  (error) => {
    console.log("第 2 個函式被呼叫了", error);
  }
);

let job2 = doWork("吃早餐", 5000, true);
job2.then(
  (result) => {
    console.log("第 1 個函式被呼叫了", result);
  },
  (error) => {
    console.log("第 2 個函式被呼叫了", error);
  }
);

let job3 = doWork("寫功課", 3000, true);
job3.then(
  (result) => {
    console.log("第 1 個函式被呼叫了", result);
  },
  (error) => {
    console.log("第 2 個函式被呼叫了", error);
  }
);
