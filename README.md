# Midjourney Wechat Bot

[![Powered by Sidecar](https://img.shields.io/badge/Powered%20By-Sidecar-red.svg)](https://github.com/huan/sidecar)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![GitHub stars](https://img.shields.io/github/stars/lifecoder1988/mj-wechat-bot.svg?label=github%20stars)](https://github.com/lifecoder1988/mj-wechat-bot)

<img src="/bot-logo.png" alt="midjourney wechat bot base on fakingai.com" width="300" height="300" align="bottom" />

This Bot based on FakingAI API . Official website is: <https://fakingai.com>

## The Goal

<img src="/goal.jpg" alt="midjourney wechat bot base on fakingai.com" height="300" align="bottom" />

## GETTING STARTED

- STEP 1: Install Wechat Client in your Windows computer.
- STEP 2: Login the Wechat Client on the computer.
- SETP 3: Get a token from FakingAI.com.
  - get one token in fakingai.com when you login console
    - <img  src="/token.jpg"  alt="midjourney wechat bot base on fakingai.com"   height="300"  align="bottom"  />
  - subscribe free plan to make token working (it's free now)
    - <img  src="/sub.jpg"  alt="midjourney wechat bot base on fakingai.com"    height="300"  align="bottom"  />
- STEP 4: Getting Started with TypeScript/JavaScript (RECOMMENDED).

## QUICK START

> only support WeChat v3.6.0.18 , You can download below.

```sh


git clone https://github.com/lifecoder1988/mj-wechat-bot.git
cd mj-wechat-bot
npm install

# config .env file 

# ----------------- .env content ------------------ 

BOT_NAME="@宝宝" # wechat bot  name (same as @宝宝)

WEBHOOK_URL="https://a-key-named-by-you.loca.lt"

MJ_API_TOKEN="xxxxxxxx" # generate from faking ai

# --------------------- .env content done ----------

npm start

# install local tunel 
npm install -g localtunnel

# start lt with fixed subdomain and port 

lt --port 3000 --subdomain a-key-named-by-you

#
# Do not forget to install WeChat with requried version and login.
#
```

### Resource

- [Download Wechat 3.6.0.18](https://github.com/tom-snow/wechat-windows-versions/releases/download/v3.6.0.18/WeChatSetup-3.6.0.18.exe)

## Author

1. Joe Wang [@lifecoder1988](https://github.com/lifecoder1988)

## Copyright & License

- Code released under the Apache-2.0 License
