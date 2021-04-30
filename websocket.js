const { MixinSocket } = require('mixin-node-sdk')
const { CLIENT_CONFIG } = require('./config')
const model = require('./model')
let client = new MixinSocket(CLIENT_CONFIG)

client.get_message_handler = async function (message) {
  if (!message.action || message.action === 'ACKNOWLEDGE_MESSAGE_RECEIPT' || message.action === 'LIST_PENDING_MESSAGES') return;
  if (message.error) return console.error(message.error)
  if (message.data.category === 'SYSTEM_ACCOUNT_SNAPSHOT') await model.updateOrderToPaid(message)
  else await model.forwardMessage(message.data)
  this.read_message(message)
}

module.exports = client
