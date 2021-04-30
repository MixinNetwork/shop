import request from './config'

class APIS {
  constructor() {
    this.request = request
  }
  async authenticate(code) {
    return await this.request.get('/authenticate', { params: { code } })
  }
  async getStatus() {
    return await this.request.get('/status')
  }
  async addOrder({ name, phone, region, address, notes, color, size, style }) {
    return await this.request.post('/addOrder', { name, phone, region, address, notes, color, size, style })
  }
  async checkPaid() {
    return await this.request.get('/checkPaid')
  }
  async getAllOrder(status) {
    return await this.request.get('/getAllOrder', { params: { status } })
  }
  async updateOrder(order_id, status, tracking) {
    return await this.request.post('/updateOrder', { order_id, status, tracking })
  }
  async updateOptions(order_id, size, color, style, notes) {
    return await this.request.post('/updateOptions', { order_id, size, color, style, notes })
  }
  async searchOrder(order_id) {
    return await this.request.get('/searchOrder', { params: { order_id } })
  }
  async sendMessage(params) {
    return await this.request.post('/sendMessage', params)
  }
}


export default new APIS()



