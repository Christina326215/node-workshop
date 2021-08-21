## Cookie、LocalStorage、SessionStorage、Sessio、Token 之差異

https://iter01.com/511357.html

https://medium.com/@bebebobohaha/cookie-localstorage-sessionstorage-%E5%B7%AE%E7%95%B0-9e1d5df3dd7f

1. Cookie：

- 當接收到客戶端發出的 HTTP 請求時，伺服器可以傳送帶有響應的 Set-Cookie 標頭，Cookie 通常由瀏覽器儲存，然後將 Cookie 與 HTTP 標頭一同向伺服器發出請求。
- Cookie 通常被用來保持使用者的登入狀態，如果兩次請求都來自相同的瀏覽器，有個數限制（各瀏覽器不同），一般不能超過 20 個，大小約 4kb，每次 http request 時都會帶上，保存過多數據會帶來效能問題。
- 可以設定失效時間，預設是關閉瀏覽器後失效。
- 有兩種型別的 Cookies，一種是 Session Cookies，一種是 Persistent Cookies，如果 Cookie 沒有指定 Expires 或 Max-Age 指令，則將其視為會話 Cookie。會話 Cookie 儲存在記憶體中，永遠不會寫入磁碟，當瀏覽器關閉時，此後 Cookie 將永久丟失。如果 Cookie 包含有效期，則將其視為永續性 Cookie，在到期指定的日期，Cookie 將從磁碟中刪除。
-

2. LocalStorage / SessionStorage：

- 是 HTML5 提供兩種在客戶端儲存資料的方法，彌補了 cookie 儲存量小、不適用於大量資料本地儲存的問題。
- sessionStorage 將資料儲存在 session 中，關閉頁面或瀏覽器後就被清除；
- 而 localStorage 則一直將資料儲存在客戶端本地，除非被刪除，否則永久保存；
- 不管是 sessionStorage，還是 localStorage，可使用的 API 都相同。
- 兩者都是使用 key / value pair 的方式給值或取值，大小預設有 5mb，僅在瀏覽器保存，每次 request 不會帶上，不與 Server 溝通。
  **LocalStorage 不會過期，除非手動清除。**
  **SessionStorage 每次分頁或瀏覽器關掉後就會清除。**

3. Session：

- 客戶端請求服務端，服務端會為這次請求開闢一塊記憶體空間，這個物件便是 Session 物件，儲存結構為 ConcurrentHashMap。
- 伺服器第一次接收到請求時，開闢了一塊 Session 空間（建立了 Session 物件），同時生成一個 sessionId ，並通過響應頭的 Set-Cookie：JSESSIONID=XXXXXXX 命令，向客戶端傳送要求設定 Cookie 的響應；客戶端收到響應後，在本機客戶端設定了一個 JSESSIONID=XXXXXXX 的 Cookie 資訊，該 Cookie 的過期時間為瀏覽器會話結束。
- 接下來客戶端每次向同一個網站傳送請求時，請求頭都會帶上該 Cookie 資訊（包含 sessionId ）， 然後，伺服器通過讀取請求頭中的 Cookie 資訊，獲取名稱為 JSESSIONID 的值，得到此次請求的 sessionId。

4. Json Web Tokens:
