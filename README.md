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

# 確認自己用的 shell 是哪一種後，修改相對應的設定檔。
$ echo $0

# 使用下面指令進入修改
$ nano ~/.bash_profile

# 輸入下列進去(會出現在install那邊可以copy)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This load$

# 修改完，存檔後，重新啟動 terminal

# 重新啟動 terminal後,輸入下列指令查詢版本號
$ nvm -v

# 列出可以安裝的版本
$ nvm ls-remote 14

# 安裝最新版本號
$ nvm install 14.17.4

# 切換要使用的 node 版本
$ nvm use 14.17.4

# 確認目前執行的版本
$ node -v

# 列出你目前主機安裝的版本
$ nvm ls

# 設定預設的版本
$ nvm alias default 14.17.4

# 執行檔案
$ node {檔名sum.js}
```


### Condition:想先在github上建立repo，再clone下來到自己的本機。
```
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
```



