
CREATE TABLE IF NOT EXISTS users (
  user_id             VARCHAR(36) NOT NULL PRIMARY KEY,
  identity_number     BIGINT NOT NULL UNIQUE,
  access_token        VARCHAR(512) NOT NULL DEFAULT '',
  full_name           VARCHAR(1024) NOT NULL,
  phone               VARCHAR(16),
  avatar_url          VARCHAR(1024) NOT NULL,
  created_at          VARCHAR(64) NOT NULL,
  register_at         TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  order_id            VARCHAR(15) NOT NULL PRIMARY KEY,
  user_id             VARCHAR(36) NOT NULL,
  status              VARCHAR(36) NOT NULL DEFAULT 'unpaid',
  name                VARCHAR(64) NOT NULL,
  phone               VARCHAR(16) NOT NULL,
  region              VARCHAR(1024) NOT NULL,
  address             VARCHAR(1024) NOT NULL,
  notes               VARCHAR(1024),
  color               VARCHAR(64) NOT NULL,
  size                VARCHAR(64) NOT NULL,
  tracking            VARCHAR(512),
  track_at            TIMESTAMP WITH TIME ZONE,
  trace_id            VARCHAR(36) NOT NULL UNIQUE,
  trace_at            TIMESTAMP WITH TIME ZONE,
  created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS message (
  message_id             VARCHAR(36) NOT NULL PRIMARY KEY,
  admin_id               VARCHAR(36) NOT NULL,
  recipient_id           VARCHAR(36) NOT NULL,
  origin_message_id      VARCHAR(36) NOT NULL,
  conversation_id        VARCHAR(36) NOT NULL,
  admin_message_id       VARCHAR(36),
  created_at             TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);


-- CREATE TABLE IF NOT EXISTS orders (
--   order_id            VARCHAR(15) NOT NULL PRIMARY KEY,
--   product_id          VARCHAR(36) NOT NULL,
--   user_id             VARCHAR(36) NOT NULL,
--   status              VARCHAR(36) NOT NULL DEFAULT 'unpaid',
--   name                VARCHAR(64) NOT NULL,
--   phone               VARCHAR(16) NOT NULL,
--   region              VARCHAR(1024) NOT NULL,
--   address             VARCHAR(1024) NOT NULL,
--   notes               VARCHAR(1024),
--   tracking            VARCHAR(512),
--   track_at            TIMESTAMP WITH TIME ZONE,
--   trace_id            VARCHAR(36) NOT NULL UNIQUE,
--   trace_at            TIMESTAMP WITH TIME ZONE,
--   created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
-- );

-- CREATE TABLE IF NOT EXISTS order_product (
--   order_id            VARCHAR(15) NOT NULL PRIMARY KEY,
--   product_id          VARCHAR(36) NOT NULL,
--   keys                BIGINT[] NOT NULL,
--   values              BIGINT[] NOT NULL,
--   created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
-- );

-- CREATE TABLE IF NOT EXISTS products (
--   product_id          VARCHAR(36) NOT NULL PRIMARY KEY,
--   name                VARCHAR(1024) NOT NULL,
--   price               VARCHAR(128) NOT NULL,
--   symbol              VARCHAR(36) NOT NULL,
--   asset_id            VARCHAR(36) NOT NULL,
--   keys                BIGINT[],
--   created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
-- );

-- CREATE TABLE IF NOT EXISTS properties (
--   id                  SERIAL NOT NULL,
--   name                VARCHAR(1024) NOT NULL,
--   created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
-- );

-- INSERT INTO properties(name) VALUES('color');  -- 1
-- INSERT INTO properties(name) VALUES('size');  -- 2

-- INSERT INTO products(product_id, name, keys, price, symbol, asset_id) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', 'Mixin T 恤', '{1,2}', '0.1', 'XIN', 'c94ac88f-4671-3976-b60a-09064f1811e8');

-- CREATE TABLE IF NOT EXISTS property_values (
--   property_id         BIGINT NOT NULL,
--   id                  BIGINT NOT NULL,
--   value               VARCHAR(1024) NOT NULL,
--   created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
-- );

-- INSERT INTO property_values(product_id, id, value) VALUES(1, 1, 'black')
-- INSERT INTO property_values(product_id, id, value) VALUES(1, 2, 'gray')
-- INSERT INTO property_values(product_id, id, value) VALUES(1, 3, 'green')
-- INSERT INTO property_values(product_id, id, value) VALUES(1, 4, 'blue')
-- INSERT INTO property_values(product_id, id, value) VALUES(1, 5, 'red')

-- INSERT INTO property_values(product_id, id, value) VALUES(2, 1, 'M') 
-- INSERT INTO property_values(product_id, id, value) VALUES(2, 2, 'L')
-- INSERT INTO property_values(product_id, id, value) VALUES(2, 3, 'XL')
-- INSERT INTO property_values(product_id, id, value) VALUES(2, 4, '2XL')
-- INSERT INTO property_values(product_id, id, value) VALUES(2, 5, '3XL')

-- CREATE TABLE IF NOT EXISTS inventory (
--   product_id          VARCHAR(36) NOT NULL,
--   keys                BIGINT[] NOT NULL,
--   values              BIGINT[] NOT NULL,
--   amount              BIGINT NOT NULL DEFAULT 0,
--   created_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
--   PRIMARY KEY(product_id, keys)
-- );

-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{1, 1}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{1, 2}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{1, 3}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{1, 4}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{1, 5}', 50)

-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{2, 1}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{2, 2}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{2, 3}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{2, 4}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{2, 5}', 50)

-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{3, 1}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{3, 2}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{3, 3}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{3, 4}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{3, 5}', 50)

-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{4, 1}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{4, 2}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{4, 3}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{4, 4}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{4, 5}', 50)

-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{5, 1}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{5, 2}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{5, 3}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{5, 4}', 50)
-- INSERT INTO inventory(product_id, keys, values, amount) VALUES('27f4b018-dcf5-4787-93fc-7d72b9d8109d', '{1,2}', '{5, 5}', 50)




