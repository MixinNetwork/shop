// alter table users add actual_amount VARCHAR(128) NOT NULL DEFAULT '';
module.exports = {
  // users
  ADD_OR_UPDATE_USER: 'INSERT INTO users(user_id, identity_number, access_token, full_name, avatar_url, phone,  created_at) VALUES($1::varchar, $2::BIGINT, $3::varchar, $4::varchar, $5::varchar, $6::varchar, $7::varchar) ON CONFLICT(user_id) DO UPDATE SET identity_number=$2, access_token=$3, full_name=$4, avatar_url=$5, phone=$6, created_at=$7',
  GET_USER_BY_TOKEN: 'SELECT user_id, full_name, avatar_url, identity_number, phone FROM users WHERE access_token=$1',
  GET_USER_BY_NUMBER: 'SELECT user_id FROM users WHERE identity_number=$1',
  DELETE_USER: 'DELETE FROM users WHERE user_id=$1',
  UPDATE_USER: 'UPDATE users SET full_name=$2, phone=$3 WHERE user_id=$1',
  GET_USER: 'SELECT * FROM users WHERE user_id=$1',
  GET_ALL_USER: 'SELECT user_id FROM users',


  // orders
  ADD_ORDER: 'INSERT INTO orders(order_id, user_id, name, phone, region, address, notes, trace_id, color, size, style) VALUES($1::varchar, $2::varchar, $3::varchar, $4::varchar, $5::varchar, $6::varchar, $7::varchar, $8::varchar, $9::varchar, $10::varchar, $11::varchar)',
  GET_ORDER_BY_ID: 'SELECT * FROM orders WHERE order_id=$1',
  GET_ORDER_BY_TRACE: 'SELECT order_id, name, phone, region, address, notes, color, size, style FROM orders WHERE trace_id=$1',
  GET_ORDER_BY_USER: "SELECT order_id, name, phone, region, address, status, tracking, notes, color, size, style, to_char(created_at, 'YYYY-MM-DD HH:MM:SS') AS created_at FROM orders WHERE user_id=$1 AND status!='unpaid'",
  GET_ORDER_COUNT: "SELECT count(1) FROM orders WHERE status!='unpaid'",
  UPDATE_ORDER_TO_PAID: "UPDATE orders SET status='paid', trace_at=$2 WHERE order_id=$1",
  UPDATE_ORDER_TO_SHIPPING: "UPDATE orders SET status='shipping', tracking=$2, track_at=now() WHERE order_id=$1",
  UPDATE_ORDER_TO_COMPELETE: "UPDATE orders SET status='compelete' WHERE order_id=$1",
  UPDATE_ORDER_OPTIONS: 'UPDATE orders SET size=$2, color=$3, style=$4, notes=$5 WHERE order_id=$1',

  GET_ORDERS_BY_STATUS: "SELECT order_id, name, orders.phone, region, address, status, tracking, notes, color, size, style, to_char(orders.created_at, 'YYYY-MM-DD HH:MM:SS') AS created_at, full_name, identity_number FROM orders LEFT JOIN users ON orders.user_id = users.user_id WHERE status=$1 ORDER BY created_at ASC",

  GET_ORDER_BY_IDENTITY_NUBMER: "SELECT orders.* FROM users LEFT JOIN orders ON users.user_id=orders.user_id WHERE identity_number=$1 AND status!='unpaid'",

  // order_product
  // ADD_ORDER_PRODUCT: 'INSERT INTO order_product(order_id, keys, values) VALUES($1::varchar, $2::varchar, $3::varchar)',
  // GET_ORDER_PRODUCT_BY_ID: 'SELECT color, size FROM order_product WHERE order_id=$1',


  // message
  ADD_MESSAGE: "INSERT INTO message(message_id, origin_message_id, recipient_id, conversation_id, admin_id) VALUES($1::varchar, $2::varchar, $3::varchar, $4::varchar, $5::varchar)",
  ADD_ADMIN_MESSAGE: "INSERT INTO message(message_id, origin_message_id, recipient_id, conversation_id, admin_id, admin_message_id) VALUES($1::varchar, $2::varchar, $3::varchar, $4::varchar, $5::varchar, $6::varchar)",
  GET_MESSAGE_BY_ID: "SELECT conversation_id, origin_message_id, recipient_id FROM message WHERE message_id=$1",
  GET_MESSAGES_BY_ORIGIN_ID: 'SELECT message_id, recipient_id, conversation_id, admin_id FROM message WHERE origin_message_id=$1',
  GET_MESSAGES_BY_ADMIN_ID: 'SELECT message_id, recipient_id, conversation_id FROM message WHERE admin_message_id=$1',
  DELETE_MESSAGE: "DELETE FROM message WHERE now() - created_at > interval '3 day'",

}

