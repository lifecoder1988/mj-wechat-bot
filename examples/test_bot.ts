import MjAPIClient from '../bot/mj-api-client'


const WEBHOOK_URL = "https://SLTFXI8gFKPrIayO.loca.lt"

const client = new MjAPIClient(WEBHOOK_URL)

await client.imagine("this is a joke",{
    "roomId" : 1
})


console.log(123)