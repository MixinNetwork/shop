const { ajax, ajaxWithHeader } = require('./config')
const { LOCATION } = require('../tools/const')

class APIS {
  constructor() {
    this.ajax = ajax
    this.ajaxWithHeader = ajaxWithHeader
  }

  async sendBtn(recipient_id, message) {
    return await this.ajax.send_buttons({
      recipient_id,
      data: [
        { label: message, color: '#409eff', action: LOCATION + '/orderDetail?t=1' }
      ]
    })
  }

  async getMeWithToken(token) {
    return await ajaxWithHeader.get(token, '/me')
  }
}


module.exports = new APIS()

