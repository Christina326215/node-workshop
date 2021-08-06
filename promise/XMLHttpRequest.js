console.log("test");
console.log(typeof XMLHttpRequest);

// XMLHttpRequest是瀏覽器內建的，只能在瀏覽器內執行。
// XMLHttpRequest在瀏覽器中是一個function，在nodeJS裡面執行結果則為undefined。
// axios可以在前端使用，也可以在nodeJS使用。
//參考：
//https://github.com/axios/axios/blob/dbc634cf700595845abc43604e1fb6cea903b97f/lib/defaults.js#L19