const DB = require('../db')
const api = require('../api')
const { ASSET_ID, AMOUNT, ADMIN, INVENTORY, LOCATION, ORDER_INFO } = require('../tools/const')
const tools = require('../tools')

class Model extends DB {
  constructor() {
    super()
  }
  async authenticate(code) {
    let { access_token, scope } = await api.ajax.authenticate({ code })
    if (!scope || !scope.includes('PROFILE:READ')) return { error: 'auth' }
    let { user, error } = await this.initUser(access_token)
    if (error) return { error }
    let { avatar_url, full_name, user_id, phone } = user
    return { data: { access_token, avatar_url, full_name, user_id, phone } }
  }

  async addOrder({ user_id }, { name, phone, region, address, notes, color, size, style }) {
    if (!name || !phone || !region || !address || !color || !size) return { data: false }
    let trace_id = tools.getUUID()
    let count = await this.get_order_count()
    if (count >= INVENTORY) return { data: 'finished' }
    let order = await this.get_order_by_user(user_id)
    if (order) return { data: 'limited' }
    await this.add_order({ name, user_id, phone, region, address, notes, trace_id, color, size, style })
    return { data: trace_id }
  }

  async getOrder(access_token) {
    let { user, error } = await this.initUser(access_token)
    if (error) return { error }
    let { user_id } = user
    let data = await this.get_order_by_user(user_id)
    return { data }
  }

  async tracking(access_token, { order_id, tracking }) {
    let { user, error } = await this.initUser(access_token)
    if (error) return { error }
    let { identity_number } = user
    if (!ADMIN.includes(identity_number)) return { error: 'forbid' }
    await this.update_order_to_shipping({ order_id, tracking })
    return true
  }


  async checkInventory({ user_id }) {
    let count = await this.get_order_count()
    if (count >= INVENTORY) return { data: { status: 'finished' } }
    let order = await this.get_order_by_user(user_id)
    if (order) {
      let { status, size, color } = order
      return { data: { status, size, color } }
    }
    return { data: { status: 'ok' } }
  }

  async initUser(access_token) {
    let user = await this.get_user_by_token(access_token) || {}
    if (!user.user_id) {
      user = await api.getMeWithToken(access_token)
      if (!user.user_id) return { error: 'auth' }
      await this.add_user({ access_token, ...user })
    }
    return { user }
  }

  async updateOrderToPaid(message) {
    let { data } = message.data
    data = JSON.parse(Buffer.from(data, 'base64').toString())
    let { trace_id, amount, asset_id, created_at, opponent_id: recipient_id } = data
    let t = await this.get_order_by_trace(trace_id)
    if (!t || AMOUNT != amount || ASSET_ID != asset_id) {
      api.ajax.send_text({ recipient_id: ADMIN[0], data: JSON.stringify(t) + JSON.stringify(data) })
      return false
    }
    await this.update_order_to_paid({ order_id: t.order_id, trace_at: created_at })
    await api.sendBtn(recipient_id, '订单支付成功')
    let key = Object.keys(t)
    let value = Object.values(t)
    let text = ''

    key.forEach((item, index) => {
      text += `${ORDER_INFO[item]}：${value[index]}\n`
    })
    text = Buffer.from(text).toString('base64')
    let _message = { data: text, category: 'PLAIN_POST', user_id: recipient_id }
    let params = tools.getForwardParams(_message, ADMIN)
    await api.ajax.messages(params)
    return true
  }

  async checkPaid({ user_id }) {
    let data = await this.get_order_by_user(user_id) || {}
    if (!data.order_id) return { data: false }
    return { data }
  }

  async getAllOrder(status) {
    let orders = await this.get_orders_by_status(status)
    return { data: orders }
  }

  async updateOrder({ order_id, status, tracking }) {
    let data = false
    let { user_id, tracking: _tracking, status: _status } = await this.get_order_by_id(order_id)
    if (status === 'shipping') {
      await this.update_order_to_shipping({ order_id, tracking })
      data = true
      let message = _tracking ? '订单已更新' : '订单已发货'
      await api.sendBtn(user_id, message)
    } else if (status === 'complete') {
      await this.update_order_to_complete(order_id)
      data = true
      if (_status !== 'complete') await api.sendBtn(user_id, '订单已完成')
    }

    return { data }
  }

  async updateOptions({ order_id, size, color, style, notes }) {
    await this.update_order_options(order_id, size, color, style, notes)
    return { data: true }
  }

  async searchOrder(text) {
    let data = (text.length === 15 ? await this.get_order_by_id(text) : await this.get_order_by_identity_number(text)) || false
    return { data }
  }

  async sendMessage({ message, identity_number }) {
    message = decodeURI(message)
    let { user_id } = await this.get_user_by_number(identity_number)
    await api.ajax.send_text({ recipient_id: user_id, data: message })
    return { data: true }
  }

  async forwardMessage(messageData) {
    let { category, data, user_id, quote_message_id, conversation_id: origin_conversation_id, message_id: origin_message_id } = messageData
    if (ADMIN.includes(user_id)) {
      if (category === 'MESSAGE_RECALL') {
        let { message_id } = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'))
        let messages = await this.get_messages_by_id(message_id)
        let params = tools.getRecallParams(messages, user_id)
        return await api.ajax.messages(params)
      }
      if (!quote_message_id) {
        let users = await this.get_all_user()
        users = users.map(({ user_id }) => user_id)
        let params = tools.getForwardParams(messageData, users)
        let paramsList = []
        while (true) {
          paramsList.push(params.splice(0, 100))
          if (params.length <= 100) break
        }
        for (let message of paramsList) {
          await api.ajax.messages(message)
        }
        return true
      }
      let { conversation_id, origin_message_id, recipient_id } = await this.get_message_by_id(quote_message_id) || {}
      if (!conversation_id) return
      let messages = await this.get_messages_by_origin(origin_message_id)
      let params = tools.getForwardParams(messageData, ADMIN, messages)
      params.push({ conversation_id, message_id: tools.getUUID(), category, data, quote_message_id: origin_message_id, recipient_id })
      await api.ajax.messages(params)
      params.forEach(async ({ message_id, recipient_id, conversation_id: origin_conversation_id }) => {
        await this.add_admin_message(message_id, origin_message_id, recipient_id, origin_conversation_id, user_id, messageData.message_id)
      })
    } else {
      if (category === 'PLAIN_TEXT' && Buffer.from(data, 'base64').toString('utf-8') === 'Hi') return
      let params = tools.getForwardParams(messageData, ADMIN)
      await api.ajax.messages(params)
      params.forEach(async ({ message_id, recipient_id }) => {
        await this.add_message(message_id, origin_message_id, user_id, origin_conversation_id, recipient_id)
      })
    }
  }
}


module.exports = new Model()

