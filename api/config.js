const axios = require('axios')
const { CLIENT_CONFIG } = require('../config')
const { Mixin } = require('mixin-node-sdk')

const ajax = new Mixin(CLIENT_CONFIG, true)


const _mixinRequest = axios.create({
  baseURL: 'https://mixin-api.zeromesh.net',
})

function delay() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 500);
  })
}

_mixinRequest.interceptors.response.use(res => {
  let { data } = res
  if (typeof data === 'string') data = JSON.parse(data)
  return data.data || data.error
}, async e => {
  await delay()
  return await _mixinRequest(e.config)
})

const ajaxWithHeader = {
  async get(token, url, params) {
    return await _mixinRequest.get(url, {
      headers: { Authorization: 'Bearer ' + token },
      params
    })
  },
  async post(token, url, data) {
    return await _mixinRequest.post(url, data, { headers: { Authorization: 'Bearer ' + token } })
  }
}

module.exports = { ajax, ajaxWithHeader }
