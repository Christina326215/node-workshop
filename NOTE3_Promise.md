### 介紹 promise (promise的發明是為了要解決callback hell的問題。)
- pending: 等待中的初始狀態
- fulfilled: 已實現，執行成功。
- rejected: 備受拒絕，執行失敗。
**當某事件一進入Promise物件，就處於pending狀態，接下來等待事件處理完成。而Promise物件需加入建構式函式，並放入兩個參數，若成功，參數resolve會傳回表示成功的訊息，若失敗，參數reject會傳回表示失敗的訊息。**

1. 在node-wokshop/promise/promise1.js之中 (step1：將callback hell 改成使用 promise 物件)

2. 在node-wokshop/promise/promise2.js之中 (step2：在pending狀態之後，加入then，執行接續工作，但此時三項工作內容在同一時間點出發，並未符合一步接一步工作的需求。)

3. 在node-wokshop/promise/promise3.js之中 (step3：加入第二個then，使得有接續工作產生。)

4. 在node-wokshop/promise/promise4.js之中 (step4：完成任務。)
```javascript=
let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);
// 刷牙 -> 吃早餐 -> 寫功課

let doWork = function (job, timer, isOK) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let dt = new Date();
      if (isOK) {
        // isOK = true
        resolve(`完成工作: ${job} at ${dt.toISOString()}`);
      } else {
        // isOK = false
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
