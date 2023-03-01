const Vonage = require('@vonage/server-sdk').Vonage
require("dotenv").config()
const apiKey = process.env.apiKey
const apiSecret = process.env.apiSecret

const vonage = new Vonage({
  apiKey,
  apiSecret
})

async function sendSMS(to, from, text) {
  await vonage.sms.send({to, from, text})
    .then(resp => {
      console.log('Message sent successfully')
      console.log(resp)
    })
    .catch(err => {
      console.log('There was an error sending the messages.') 
      console.error(err)
    })
}

module.exports = {
  sendSMS
}