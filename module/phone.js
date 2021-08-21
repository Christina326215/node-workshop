// 模組範例

// 在建立新模組之前，建立一個新的空物件。
// exports = module.exports = {};
// 也就是module.exports = {};
// 然後exports = module.exports;
// 兩者都指向同一個物件。


let brand = "iphone";
let color = "white";
let owner = "";

function showBrand() {
  return brand;
}

function showColor() {
  return color;
}

function showOwner() {
  return owner;
}

function setOwner(name) {
  owner = name;
}

// exports = module.exports = {};

// exports.showBrand = showBrand;
// exports.showColor = showColor;
// exports.showOwner = showOwner;
// 使用exports(而非底層預設的module.exports)輸出，並給定新的空物件內容。

exports = {
 showBrand: showBrand,
 showColor: showColor,
 showOwner: showOwner,
 setOwner: setOwner,
};
// 以exports的方式輸出module，其實是在預設好的return module.exports以外又新建一個物件，但事實上無法傳回exports結果，而是return module.export空的結果，因此發生錯誤。

// module.exports.showBrand = showBrand;

module.exports = {
  showBrand,
  showColor,
  showOwner,
  setOwner,
};
// 也是建立新物件


// return module.exports
// 以上重點：無論如何底層都會設定以module.exports的方式return輸出。
