import express from "express";
import Queue from 'better-queue';

import 'dotenv/config'

import {
  Contact,
  Message,
  ScanStatus,
  WechatyBuilder,
  log,
  types,
} from 'wechaty'

import { FileBox } from 'file-box'


import MyWechatBot from './bot.js'

import MjAPIClient from './mj-api-client.js'

//  lt --port 3000 --subdomain joe-wang-test-1
console.log(process.env)

const WEBHOOK_URL = process.env["WEBHOOK_URL"]
const mjAPIClient = new MjAPIClient(WEBHOOK_URL,process.env.MJ_API_TOKEN)

const myBot = new MyWechatBot(mjAPIClient,{
  botName : process.env["BOT_NAME"]
})

await myBot.start()


const app = express();
const port = 3000;

const q = new Queue((input,cb) => {
  console.log("process task")
  myBot.handleMJTask(input)
  .then(result => {
    cb(null,result)
  })
  .catch(e => {
    console.log(e)
    cb(e)
  })
});

async function handleDiscordMessage(message) {
  q.push(message)
}
app.use(express.json());

app.post("/", async (req, res) => {
  console.log(req.body);
  await handleDiscordMessage(req.body)
  res.json({ code: 0 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
