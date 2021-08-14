// 模組範例

let brand = "iphone";
let color = "white";
let owner = "Christina";

function setBrand() {
  return brand;
}

function setColor() {
  return color;
}

function setOwner() {
  return owner;
}

module.exports = {
  setBrand,
  setColor,
  setOwner,
};

// return module.exports
// 以上重點：無論如何底層都會設定以module.exports的方式return輸出。


// ----------------------------------
// 以下以exports的方式return輸出來舉例：
// exports = module.exports = {};

// exports.setBrand = setBrand;
// exports.setColor = setColor;
// exports.setOwner = setOwner;
// 使用exports(而非底層預設的module.exports)輸出，並給定新的空物件內容。

// exports = {
//   setBrand,
//   setColor,
//   setOwner,
// };
// 以exports的方式輸出module，其實是在預設好的return module.exports以外又新建一個物件，但事實上無法傳回exports結果。
