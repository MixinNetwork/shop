const { Pool } = require('pg')
const SQL = require('./sql')
const { DATABASE_CONFIG } = require('../config')
const tools = require('../tools')
class DB {
  constructor() {
    this.SQL = SQL
    const pool = new Pool(DATABASE_CONFIG)
    this.query = async function (sql, params) {
      let client = await pool.connect()
      try {
        let { rows } = await client.query(sql, params)
        return rows
      } finally {
        await client.release()
      }
    }
    this.queryList = async function (data) {
      let client = await pool.connect()
      try {
        let res = []
        for (let i = 0, len = data.length; i < len; i++) {
          let { sql, params } = data[i]
          const { rows } = await client.query(sql, params)
          res.push(rows)
        }
        return res
      } finally {
        await client.release()
      }
    }
  }
  async _query(sql, params) {
    return await this.query(sql, params)
  }
  // users
  async add_user({ user_id, identity_number, access_token, full_name, avatar_url, phone, created_at }) {
    return await this.query(this.SQL.ADD_OR_UPDATE_USER, [user_id, identity_number, access_token, full_name, avatar_url, phone, created_at])
  }
  async get_user_by_number(identity_number) {
    return (await this.query(this.SQL.GET_USER_BY_NUMBER, [identity_number]))[0]
  }

  async get_user_by_token(access_token) {
    return (await this.query(this.SQL.GET_USER_BY_TOKEN, [access_token]))[0]
  }

  async get_all_user() {
    return await this.query(this.SQL.GET_ALL_USER)
  }

  // orders
  async add_order({ name, user_id, phone, region, address, notes, trace_id, color, size, style }) {
    let order_id
    while (true) {
      order_id = tools.getOrderID()
      let t = (await this.query(this.SQL.GET_ORDER_BY_ID, [order_id]))[0]
      if (!t) break
    }
    await this.query(this.SQL.ADD_ORDER, [order_id, user_id, name, phone, region, address, notes, trace_id, color, size, style])
    return order_id
  }

  async get_order_by_id(order_id) {
    return (await this.query(this.SQL.GET_ORDER_BY_ID, [order_id]))[0]
  }

  async get_order_by_trace(trace_id) {
    return (await this.query(this.SQL.GET_ORDER_BY_TRACE, [trace_id]))[0]
  }

  async get_order_by_user(user_id) {
    return (await this.query(this.SQL.GET_ORDER_BY_USER, [user_id]))[0]
  }

  async get_order_count() {
    return (await this.query(this.SQL.GET_ORDER_COUNT))[0].count
  }

  async update_order_to_paid({ order_id, trace_at }) {
    return await this.query(this.SQL.UPDATE_ORDER_TO_PAID, [order_id, trace_at])
  }

  async update_order_to_shipping({ order_id, tracking }) {
    return await this.query(this.SQL.UPDATE_ORDER_TO_SHIPPING, [order_id, tracking])
  }

  async update_order_to_complete(order_id) {
    return await this.query(this.SQL.UPDATE_ORDER_TO_COMPELETE, [order_id])
  }

  async update_order_options(order_id, size, color, style, notes) {
    return await this.query(this.SQL.UPDATE_ORDER_OPTIONS, [order_id, size, color, style, notes])
  }


  async get_orders_by_status(status) {
    return await this.query(this.SQL.GET_ORDERS_BY_STATUS, [status])
  }

  async get_order_by_identity_number(identity_number) {
    if (isNaN(Number(identity_number))) return
    return (await this.query(this.SQL.GET_ORDER_BY_IDENTITY_NUBMER, [identity_number]))[0]
  }

  // message
  async add_message(message_id, origin_message_id, recipient_id, conversation_id, admin_id) {
    return await this.query(this.SQL.ADD_MESSAGE, [message_id, origin_message_id, recipient_id, conversation_id, admin_id])
  }
  async add_admin_message(message_id, origin_message_id, recipient_id, conversation_id, admin_id, admin_message_id) {
    return await this.query(this.SQL.ADD_ADMIN_MESSAGE, [message_id, origin_message_id, recipient_id, conversation_id, admin_id, admin_message_id])
  }
  async get_messages_by_id(admin_message_id) {
    return await this.query(this.SQL.GET_MESSAGES_BY_ADMIN_ID, [admin_message_id])
  }
  async get_message_by_id(message_id) {
    return (await this.query(this.SQL.GET_MESSAGE_BY_ID, [message_id]))[0]
  }
  async get_messages_by_origin(origin_message_id) {
    return await this.query(this.SQL.GET_MESSAGES_BY_ORIGIN_ID, [origin_message_id])
  }
  async delete_overtime_message() {
    return await this.query(this.SQL.DELETE_MESSAGE)
  }
}

module.exports = DB
