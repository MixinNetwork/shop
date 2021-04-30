let ASSET_ID, AMOUNT, ADMIN, INVENTORY, LOCATION

(function () {
  switch (process.env.NODE_ENV) {
    case 'production':
      ASSET_ID = 'c94ac88f-4671-3976-b60a-09064f1811e8'
      AMOUNT = '0.1'
      ADMIN = [
        '04379bf8-87fb-41c6-a247-ee19bf9cf4a3',
        'e8e8cd79-cd40-4796-8c54-3a13cfe50115',
      ]
      INVENTORY = 200
      LOCATION = 'https://shop.mixinbots.com'
      break
    case 'test':
      ASSET_ID = '965e5c6e-434c-3fa9-b780-c50f43cd955c'
      AMOUNT = '0.1'
      ADMIN = [
        '04379bf8-87fb-41c6-a247-ee19bf9cf4a3',
        'b26b9a74-40dd-4e8d-8e41-94d9fce0b5c0',
        'e8e8cd79-cd40-4796-8c54-3a13cfe50115',
        'fcb87491-4fa0-4c2f-b387-262b63cbc112',
        'b847a455-aa41-4f7d-8038-0aefbe40dcaa',
        '5a5f059c-f0dd-4f9f-802d-48e3e04bac48'
      ]
      INVENTORY = 200
      LOCATION = 'http://t-shit-shop.liuzemei.com'
      break
    default:
      ASSET_ID = '965e5c6e-434c-3fa9-b780-c50f43cd955c'
      AMOUNT = '0.1'
      ADMIN = ['e8e8cd79-cd40-4796-8c54-3a13cfe50115']
      INVENTORY = 200
      LOCATION = 'http://192.168.50.237:8080'
      break
  }
})()

module.exports = { ASSET_ID, AMOUNT, ADMIN, INVENTORY, LOCATION }

module.exports.ORDER_INFO = { order_id: '订单', name: '名称', phone: '手机', region: '区域', address: '地址', notes: '备注', color: '颜色', size: '尺码', style: '款式' }
