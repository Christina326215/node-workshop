// await / async 是基於 promise 的語法糖
// await 一定要在 async 的函式裡面用

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

async function doAllWorks() {
  try {
    let result1 = await doWork("刷牙", 3000, true);
    console.log(result1);
  } catch (e) {
    console.error(e);
  }
  try {
    let result2 = await doWork("吃早餐", 5000, true);
    console.log(result2);
  } catch (e) {
    console.error(e);
  }
  try {
    let result3 = await doWork("寫功課", 3000, true);
    console.log(result3);
  } catch (e) {
    console.error(e);
  }
}

doAllWorks();
