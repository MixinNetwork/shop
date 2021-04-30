const fs = require('fs')
const forge = require('node-forge');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { ADMIN } = require('./const')

const { CLIENT_CONFIG: {
  client_id: uid,
  session_id: sid,
  private_key: privateKey
} } = require('../config')

class Tools {
  constructor() { }
  getCurrentGitHEAD() {
    const data = fs.readFileSync(path.join(__dirname, '..', '.git', 'logs', 'HEAD'), 'utf8')
    let tmp = data.substr(0, data.lastIndexOf('Neo') - 1)
    let build = tmp.substring(tmp.lastIndexOf(' ') + 1)
    return build + '-node-' + process.version
  }
  getOrderID() {
    return 'x'.repeat(15).replace(/[x]/g, c => ((Math.random() * 16) | 0).toString(16))
  }
  getJwtToken(method, uri, body) {
    uri = uri.replace('https://api.mixin.one', '')
    method = method.toLocaleUpperCase();
    if (typeof (body) === "object") {
      body = JSON.stringify(body);
    }
    let issuedAt = Math.floor(Date.now() / 1000)
    let md = forge.md.sha256.create();
    md.update(method + uri + body);
    let payload = {
      uid: uid,
      sid: sid,
      iat: issuedAt,
      exp: issuedAt + 3600,
      jti: this.getUUID(),
      sig: md.digest().toHex(),
      scp: 'FULL'
    };
    return jwt.sign(payload, privateKey, { algorithm: 'RS512' });
  }
  getRecallParams(messages) {
    return messages.map(({ message_id, recipient_id, conversation_id }) => {
      let data = Buffer.from(JSON.stringify({ message_id })).toString('base64')
      return {
        message_id: this.getUUID(),
        recipient_id,
        conversation_id,
        category: 'MESSAGE_RECALL',
        data
      }
    })
  }
  getForwardParams(messageData, users, messages) {
    let { data, category, user_id } = messageData
    let admin = users.filter(item => item !== user_id)
    return admin.map(recipient_id => {
      let obj = {
        message_id: this.getUUID(),
        category, data
      }
      if (messages) {
        let t = messages.find(item => item.admin_id === recipient_id)
        if (t) {
          obj.quote_message_id = t.message_id
        }
      }
      if (users.length === ADMIN.length) {
        obj.representative_id = user_id
      }
      return {
        conversation_id: this.getConversationId(recipient_id),
        recipient_id, ...obj
      }
    })
  }
  getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  getConversationId(recipientId) {
    let userId = uid.toString();
    recipientId = recipientId.toString();

    let [minId, maxId] = [userId, recipientId];
    if (minId > maxId) {
      [minId, maxId] = [recipientId, userId];
    }

    const hash = crypto.createHash('md5');
    hash.update(minId);
    hash.update(maxId);
    const bytes = hash.digest();

    bytes[6] = (bytes[6] & 0x0f) | 0x30;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const digest = Array.from(bytes, byte => `0${(byte & 0xff).toString(16)}`.slice(-2)).join('');
    const uuid = `${digest.slice(0, 8)}-${digest.slice(8, 12)}-${digest.slice(12, 16)}-${digest.slice(
      16,
      20
    )}-${digest.slice(20, 32)}`;
    return uuid;
  }
}


module.exports = new Tools()