
import fetch from 'node-fetch'

export default class MjAPIClient {

    constructor(webhook,token,host) {
        this.webhook = webhook
        this.host = host || "https://api.fakingai.com"
        this.token = token 
    }
    async imagine(prompt,ext) {
        const url = this.host + "/mj/imagine"
        const response = fetch(url,{
            method : "POST",
            headers :  {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify({
                prompt : prompt ,
                webhook : this.webhook,
                ext : JSON.stringify(ext)
            })
        })
        const result =  (await response).json() 
        return result 
        
    } 
}