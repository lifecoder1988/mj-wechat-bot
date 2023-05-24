import  {types as PUPPET}   from 'wechaty-puppet'

import {
  PuppetXp,
}               from '../src/mod.js'

import qrcodeTerminal from 'qrcode-terminal'

import { FileBox } from 'file-box'
  
  

  
 export default class MyWechatBot{

    constructor(mjApiClient,opts={}) {
        this.puppet = new PuppetXp()
     
        this.mjApiClient = mjApiClient
   
        this.onLogout = this.onLogout.bind(this)
        this.onLogin = this.onLogin.bind(this)
        this.onScan = this.onScan.bind(this)
        this.onError = this.onError.bind(this)
        this.onMessage = this.onMessage.bind(this)
        this.handleMJTask = this.handleMJTask.bind(this)
        this.isMentioned = this.isMentioned.bind(this)
        this.getPromptFromText = this.getPromptFromText.bind(this)
        this.puppet
        .on('logout', this.onLogout)
        .on('login',  this.onLogin)
        .on('scan',   this.onScan)
        .on('error',  this.onError)
        .on('message', this.onMessage)
        this.botName = opts.botName 
    }

    
     onScan (payload) {
      if (payload.qrcode) {
        const qrcodeImageUrl = [
          'https://wechaty.js.org/qrcode/',
          encodeURIComponent(payload.qrcode),
        ].join('')
        console.info('StarterBot', 'onScan: %s(%s) - %s', payload.status, qrcodeImageUrl)
    
        qrcodeTerminal.generate(payload.qrcode, { small: true })  // show qrcode on console
        console.info(`[${payload.status}] ${payload.qrcode}\nScan QR Code above to log in: `)
      } else {
        console.info(`[${payload.status}]`)
      }
    }
    
     onLogin (payload) {
      console.info(`${payload.contactId} login`)
    }
    
     onLogout (payload) {
      console.info(`${payload.contactId} logouted`)
    }
    
     onError (payload) {
      console.error('Bot error:', payload.data)
      /*
      if (bot.logonoff()) {
        bot.say('Wechaty error: ' + e.message).catch(console.error)
      }
      */
    }
    isMentioned(text) {
      console.log(this.botName)
      if(text && text.indexOf && text.indexOf(this.botName) >= 0) {
        return true 
      }
      return false 
    }
    getPromptFromText(text) {
      if(text && text.replace) {
        return text.replace(this.botName,"").trim()
      }
      return null
    }
    /**
     *
     * 6. The most important handler is for:
     *    dealing with Messages.
     *
     */
    async  onMessage ({
      messageId,
    }) {
    
      const msg = await this.puppet.messagePayload(messageId)
      console.log(msg)
      const {
        talkerId,
        roomId,
        text,
      } = msg 
      if(!this.isMentioned(text)) {
        return 
      }
      const prompt = this.getPromptFromText(text) 
      if (prompt == null) {
        console.log("prompt is null")
        return 
      }
      try {
        const result = await this.mjApiClient.imagine(prompt,{
          roomId : roomId,
          talkerId : talkerId
        })
        console.log(result)
      }catch(e) {
        console.log(e)
      }
     

    }
    
    
      async  start() {
        try {
            const result = await this.puppet.start() 
            console.log(result)
        }catch(e) {
            console.log(e)
            await this.puppet.stop()
        }
        
    
      } 
    async handleMJTask(task) {
      console.log(task)
      try {
        const {roomId , talkerId} = JSON.parse(task.ext)
        const response = JSON.parse(task.response)
        if(!response["components"] || response["components"].length == 0 ) {
          console.log("components empty , just skip...")
          return 
        }
        const imgUrl = response["attachments"][0]["attachment"]
        const imgFile = FileBox.fromUrl(imgUrl)
        await this.puppet.messageSendFile(roomId || talkerId, imgFile)
      }catch(e) {
        console.log(e)
      }
      
    }
  }


  