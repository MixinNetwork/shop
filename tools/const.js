let ASSET_ID, AMOUNT, ADMIN, INVENTORY, LOCATION

(function () {
  switch (process.env.NODE_ENV) {
    case 'production':
      ASSET_ID = 'c94ac88f-4671-3976-b60a-09064f1811e8'
      AMOUNT = '0.02'
      ADMIN = [
        '04379bf8-87fb-41c6-a247-ee19bf9cf4a3',
        'e8e8cd79-cd40-4796-8c54-3a13cfe50115',
      ]
      INVENTORY = 200
      LOCATION = 'https://shop.mixinbots.com'
      break
    default:
      ASSET_ID = '965e5c6e-434c-3fa9-b780-c50f43cd955c'
      AMOUNT = '0.02'
      ADMIN = ['e8e8cd79-cd40-4796-8c54-3a13cfe50115']
      INVENTORY = 200
      LOCATION = 'http://192.168.50.237:8080'
      break
  }
})()

module.exports = { ASSET_ID, AMOUNT, ADMIN, INVENTORY, LOCATION }

module.exports.ORDER_INFO = { order_id: '订单', name: '名称', phone: '手机', region: '区域', address: '地址', notes: '备注', color: '颜色', size: '尺码', style: '款式' }
