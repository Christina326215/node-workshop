async function asyncF() {
  console.log(1);
  // await 暫停鍵
  await new Promise((resolve, reject) => {
    console.log("A");
    // 非同步 --> single-thread 還是要去把工作交接出去
    setTimeout(() => {
      console.log(2);
      resolve();
      // reject
    }, 0);
  });
  console.log(3);
}
console.log(4);
asyncF();
console.log(5);

// 結果：
// 有await: 4 -> 1 -> A -> 5 -> 2 -> 3
// 無await: 4 -> 1 -> A -> 3 -> 5 -> 2
// 1. 程式由第12行開始，console.log(4)，所以第一個結果為4。
// 2. 接著回到第一行，呼叫function asyncF()，非同步async、把工作丟給暗樁做。
// 3. 執行function syncF()，並且console.log(1)，所以第二個結果為1。
// 4. 需await
// 5. 先處理function外的console.log(5)，第三個結果得5。
// 6. stack裡面沒東西了，event loop 把 queue 的東西拿過來執行，回來處理await的console.log(2)，第四個結果得2。
// 7. 最後執行console.log(3)，第五個結果得3。