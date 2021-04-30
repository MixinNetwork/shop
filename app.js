const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const model = require('./model')
const { Auth, AdminAuth } = require('./middleware/auth')
const websocket = require('./websocket')
websocket.start()


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.use(bodyParser.json())

app.get('/api/authenticate', async (req, res) => {
  let { code } = req.query
  try {
    let data = await model.authenticate(code)
    return res.json(data)
  } catch (e) {
    console.error('/authenticate', e)
    return res.json({ error: 'server' })
  }
})

app.post('/api/addOrder', Auth, async (req, res) => {
  try {
    let data = await model.addOrder(req.user_info, req.body)
    return res.json(data)
  } catch (e) {
    console.error('/addOrder', e)
    return res.json({ error: 'server' })
  }
})

app.get('/api/status', Auth, async (req, res) => {
  try {
    let data = await model.checkInventory(req.user_info)
    return res.json(data)
  } catch (e) {
    console.error('/status', e)
    return res.json({ error: 'server' })
  }
})

app.get('/api/checkPaid', Auth, async (req, res) => {
  try {
    let data = await model.checkPaid(req.user_info)
    return res.json(data)
  } catch (e) {
    console.error('/checkPaid', e)
    return res.json({ error: 'server' })
  }
})

app.get('/api/getAllOrder', AdminAuth, async (req, res) => {
  try {
    let { status } = req.query
    let data = await model.getAllOrder(status)
    return res.json(data)
  } catch (e) {
    console.error('/getAllOrder', e)
    return res.json({ error: 'server' })
  }
})

app.post('/api/updateOrder', AdminAuth, async (req, res) => {
  try {
    let data = await model.updateOrder(req.body)
    return res.json(data)
  } catch (e) {
    console.error('/updateOrder', e)
    return res.json({ error: 'server' })
  }
})

app.post('/api/updateOptions', AdminAuth, async (req, res) => {
  try {
    let data = await model.updateOptions(req.body)
    return res.json(data)
  } catch (e) {
    console.error('/updateOptions', e)
    return res.json({ error: 'server' })
  }
})

app.get('/api/searchOrder', AdminAuth, async (req, res) => {
  try {
    let { order_id } = req.query
    let data = await model.searchOrder(order_id)
    return res.json(data)
  } catch (e) {
    console.error('/updateOrder', e)
    return res.json({ error: 'server' })
  }
})

app.post('/api/sendMessage', async (req, res) => {
  let data = await model.sendMessage(req.body)
  return res.json(data)
})

app.get('/api/test', async (req, res) => {
  console.log(req.query)
  return res.json({ data: 'ok' })
})

app.post('/api/test', async (req, res) => {
  console.log(req.query)
  console.log(req.body)
  return res.json({ data: 'ok' })
})

app.listen(9098, () => {
  console.log('Server started on 9098')
})