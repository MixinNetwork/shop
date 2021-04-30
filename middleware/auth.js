
const model = require('../model')
const { ADMIN } = require('../tools/const')


async function getUser(req) {
  let authorization = req.headers.authorization
  if (!authorization) return { error: 'auth' }
  let access_token = req.headers.authorization.split(' ')[1]
  let { error, user } = await model.initUser(access_token)
  if (error) return { error }
  req.user_info = user
  return { user }
}

module.exports.Auth = async (req, res, next) => {
  let { error } = await getUser(req)
  if (error) return res.json({ error })
  next()
}

module.exports.AdminAuth = async (req, res, next) => {
  let { user, error } = await getUser(req)
  if (error) return res.json({ error })
  if (!ADMIN.includes(user.user_id)) return res.json({ error: 'auth' })
  next()
}