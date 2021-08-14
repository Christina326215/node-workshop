### 模組範例

- 在建立新模組之前，建立一個新的空物件，底層做的。
- exports = module.exports = {};
- 也就是 module.exports = {};
- 然後 exports = module.exports;
- 兩者都指向同一個物件，如下圖。
  ![](2021-08-14-21-46-36.png)

- exports.showColor = showColor; 與 module.exports.showColor = showColor; 是同一件事，如下圖。
  ![](2021-08-14-21-54-37.png)

```bash=
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
// 以exports的方式輸出module，
// 其實是在預設好的return module.exports以外又新建一個物件，
// 但事實上無法傳回exports結果，而是return module.export空的結果，
// 因此發生錯誤。

module.exports.showBrand = showBrand;

// module.exports = {
//   showBrand,
//   showColor,
//   showOwner,
//   setOwner,
// };
// 指向新物件

// return module.exports
// 以上重點：無論如何底層都會設定以module.exports的方式return輸出。
// 如果是要使用 exports，要很小心，不要為 exports 重新宣告一個物件。
```

![](2021-08-14-22-31-14.png)

![](2021-08-14-22-34-43.png)
