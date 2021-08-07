// 請問下列程式碼印出的順序為何？

function syncF() {
  console.log(1);

  setTimeout(() => {
    console.log(2);
  }, 0);
  console.log(3);
}

console.log(4);
syncF();
console.log(5);

// 結果：4 1 3 5 2
// 1. 程式由第12行開始，console.log(4)，所以第一個結果為4。
// 2. 接著呼叫function syncF()。
// 3. 執行function syncF()，並且console.log(1)，所以第二個結果為1。
// 4. 再console.log(3)，第三個結果得3，setTimeout丟到quere。
// 5. 執行function外的console.log(5)，第四個結果得5。
// 6. stack裡面沒東西了，event loop 把 queue 的東西拿過來執行，第五個結果得2。
