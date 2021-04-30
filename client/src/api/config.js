import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_APP_SERVER
})

let retry = 0

request.interceptors.request.use(config => {
  config.headers.Authorization = "Bearer " + window.localStorage.getItem("token")
  let t = Number(new Date())
  config.params = { t, ...config.params }
  return config
})

function backOff() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 500);
  })
}

request.interceptors.response.use(res => {
  retry = 0
  let { data, error } = res.data
  if (data !== undefined) return data
  _vm.$message(_vm.$t('error.' + error))
  if (error === 'auth') _vm.$bus.toAuth()
  return
}, async err => {
  await backOff()
  if (retry > 5) {
    _vm.$message(_vm.$t('error.network'))
    retry = 0
    return 'networkError'
  }
  retry++
  return request(err.config)
})


export default request
