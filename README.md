---
title: My Learning Note - NodeJS Workshop 
description: Node.JS note
version: 20210731
---

#### 前言：過去所學的Javascript是一種程式語言，限於瀏覽器使用，而 NodeJS 是一個執行環境，可以脫離瀏覽器、在伺服器執行 JS 程式語言的一個環境。
-> document,window,location,setTimeout,setInterval由瀏覽器提供。
-> NodeJS和瀏覽器都有提供console.log, setTimeout, setInterval。


#### 安裝 node
```
nvm: node version manager
```

```bash=
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

# 確認自己用的 shell 是哪一種後，修改相對應的設定檔。
```bash=
$ echo $0
```

# 使用下面指令進入修改
```bash=
$ nano ~/.bash_profile
```

# 輸入下列進去(會出現在install那邊可以copy)
```bash=
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This load$
```

# 修改完，存檔後，重新啟動 terminal

# 重新啟動 terminal後,輸入下列指令查詢版本號
```bash=
$ nvm -v
```

# 列出可以安裝的版本
```bash=
$ nvm ls-remote 14
```

# 安裝最新版本號
```bash=
$ nvm install 14.17.4
```

# 切換要使用的 node 版本
```bash=
$ nvm use 14.17.4
```

# 確認目前執行的版本
```bash=
$ node -v
```

# 列出你目前主機安裝的版本
```bash=
$ nvm ls
```

# 設定預設的版本
```bash=
$ nvm alias default 14.17.4
```

# 執行檔案
```bash=
$ node {檔名sum.js}
```

### Condition:想先在github上建立repo，再clone下來到自己的本機。
1. 到 github 建立 node-workshop 專案
2. 選擇https clone 複製 url
3. 到終端機clone剛新建立的專案(會直接產生一個新資料夾)
```bash=
$ git clone {url}
```
4. 可再建立新資料夾並新增檔案
5. 執行檔案
```bash=
$ node {檔案名稱sum.js}
```
6. git add, commit -> git push
----
Process 成本比較高的執行單位，content swtich 的成本比較高
Thread: Process 之下，CPU 執行的單位 （可能會發生 race condition)

![](https://i.imgur.com/azCAxXO.png)

### nodeJS 有以下四個特色：
1. 單執行緒(single thread)
2. 非阻塞
3. 非同步 IO
4. 有 event loop

- NodeJS (JS) 是單執行緒、非阻塞
- JS 設計哲學: 我不想要處理 race condition、我不想要有很多 content switch 成本
```
JS -> single-thread --> non-blocking 非阻塞 --> WebAPI, NodeJS API
   -> callback / queue / event-loop
     --> callback hell
```     

### PHP 有以下四個特色：
1. multi-process
2. 阻塞
3. 同步 IO
4. 沒有 event loop

上課測試結論：
- nodeJS=麥當勞(客人請旁邊稍等) / PHP=銀行(緊握電話)
- apache + php 會有很多個 process
- node 只有一個 process (只有一個 thread*)
- 小壓力：沒太多差別
    - apache + php 會一直開新的 process
    - node 永遠只有一個，但 CPU 一直飆高
- 大壓力:
    - apache + php => 開到太多就 crash => 有多個 request failed
    - node: 沒有任何 request failed，而且表現數據比小壓力還好

NodeJS vs PHP -> 依照我們上述測試，NodeJS 比較快

所謂的性能比較，不同情境下，可能會有截然不同的結果

php 開這麼多 process，為什麼還比較慢？ => content switch 的成本、記憶體的資源
node 單執行緒 => 先用完 CPU
  - 缺點：無法善用多核心
 
PHP 容錯能力比較強大
node single-thread 一但發生讓這個 thread 中止執行的錯誤時，可能整個 server 就掰掰了
----
- stack: Data Structure 的一種，Last In First Out (LIFO) 或 Fisrt In Last Out (FILO)。

- Queue -> 佇列、排隊，First In First Out (FIFO)。

![](https://i.imgur.com/CDkxhLn.png)

![](https://i.imgur.com/yXHU74r.png)

![](https://i.imgur.com/10XuJdB.png)
----
[ 重要的 JS 觀念]
https://reurl.cc/7rAGbd
----
## 介紹同步與非同步：
### 重點一：設定同步或非同步
1. 首先建立一個新分支 xhr 
```bash=
$ git branch xhr
$ git switch xhr
```
2. 在 basic 資料夾建立一個 xhr.html
3. 編寫 xhr.html 
   https://github.com/Christina326215/node-workshop/blob/main/basic/xhr.html
4. git add , git commit 
5. git push -u origin xhr

### 重點二：進行merge及git pull
1. 在github上 發 pull request
2. 進行code review。
3. 進行 merge。(此時，xhr.html這個檔案從xhr分支merge到main主分支)
4. 回到 terminal，切換回 main，接著 執行git pull
```bash=
$ git switch main 
# 更新
$ git pull
```

----
## 介紹callback function:
1. 建立一個 callback 分支，切換到 callback 分支。
```bash=
$ git branch callback
$ git switch callback
```
2. 建立 callback 資料夾，在裡面建立 callback1.js。
   https://github.com/Christina326215/node-workshop/blob/main/callback/callback1.js
3. add, commit, push 上去。
```bash=
$ git push -u origin callback
```
4. 執行 pull request。
5. 進行 code view。
6. merge 檔案callback1.js 從分支 callback 到 main。
7. 進行 git pull ，更新本地的 main 分支。









