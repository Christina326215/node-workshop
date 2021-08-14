let phone = require("./phone");

phone.setOwner("Tina");
console.log(phone);  
console.log(phone.showBrand());  
console.log(phone.showOwner());   

// 結果：
// {
//     showBrand: [Function: showBrand],
//     showColor: [Function: showColor],
//     showOwner: [Function: showOwner],
//     setOwner: [Function: setOwner]
//   }
//   iphone
//   Tina