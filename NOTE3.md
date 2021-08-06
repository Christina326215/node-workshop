### 介紹 promise
1. 在node-wokshop/promise/promise1.js之中 (step1：將callback hell 改成使用 promise 物件)
```javascript=
let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
// 刷牙 -> 吃早餐 -> 寫功課

// Promise 是一個表示非同步運算的「最終」完成或失敗的「物件」。
// Promise 使用非同步模式，它是一個物件，而且是建構式物件，需加入函式。
// 物件： new Promise();
// 建構式一定要傳入一個函式，而且這個函式本身會有兩個參數resolve, reject，分別表示成功或失敗。
let doWork = function (job, timer, isOK) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let dt = new Date();
      if (isOK) {
        // 完成 isOK = true
        resolve(`完成工作: ${job} at ${dt.toISOString()}`);
      } else {
        // 失敗 isOK = false
        reject(`失敗了 ${job}`);
      }
    }, timer);
  });
};

 //刷牙成功resolve
let job1_1 = doWork("刷牙", 3000, true);
console.log(job1_1);  //還在pending狀態
job1_1.then(
  function (resolve) {
    console.log("第 1 個函式被呼叫了", resolve);
    console.log(job1_1);
  },
  function (reject) {
    console.log("第 2 個函式被呼叫了", reject);
    console.log(job1_1);
  }
);

 //刷牙失敗reject
let job1_2 = doWork("刷牙", 3000, false);
console.log(job1_2);  //還在pending狀態
job1_2.then(
  function (resolve) {
    console.log("第 1 個函式被呼叫了", resolve);
    console.log(job1_2);
  },
  function (reject) {
    console.log("第 2 個函式被呼叫了", reject);
    console.log(job1_2);
  }
);
```
----
2. 在node-wokshop/promise/promise2.js之中 (step2：在pending狀態之後，加入then，執行接續工作，但此時三項工作內容在同一時間點出發，並未符合一步接一步工作的需求。)
```javascript=
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
//結果顯示，因為非同步的關係，開始工作的3秒後同時回傳刷牙和寫功課、開始工作的5秒後回傳吃早餐，未達成接續工作效果。
```

----
3. 在node-wokshop/promise/promise3.js之中 (step3：加入第二個then，使得有接續工作產生。)
```javascript=
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
```

----
4. 在node-wokshop/promise/promise4.js之中 (step4：完成任務。)
```javascript=
let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
// 刷牙 -> 吃早餐 -> 寫功課

let doWork = function (job, timer, isOK) {
  return new Promise((resolve, reject) => {
    // console.log("in promise");
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
job1
  .then((resolve) => {
    console.log("first", resolve);
    return doWork("吃早餐", 5000, true);
  })
  .then((resolve) => {
    console.log("second", resolve);
    return doWork("寫功課", 3000, true);
  })
  .then((resolve) => {
    console.log("third", resolve);
  })
  .catch((reject) => {
    console.log("error", reject);
  })
  .finally(() => {
    console.log("finally");
  });

```
