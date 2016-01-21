# shop
openDatabase("webDB", "My DB","DB", '??')

*** DB script ****
CREATE TABLE IF NOT EXISTS store(ID INTEGER PRIMARY KEY ASC, name TEXT, address TEXT, icon TEXT);
CREATE TABLE IF NOT EXISTS category(ID INTEGER PRIMARY KEY ASC, name TEXT, icon TEXT);
CREATE TABLE IF NOT EXISTS product(ID INTEGER PRIMARY KEY ASC, categoryID INTEGER, name TEXT, icon TEXT, image TEXT, price INTEGER);
CREATE TABLE IF NOT EXISTS orders(ID INTEGER PRIMARY KEY ASC, storeID INTEGER, type INTEGER, date DATETIME, note TEXT);
CREATE TABLE IF NOT EXISTS order_detail(ID INTEGER PRIMARY KEY ASC, ordersID INTEGER, productID INTEGER, price INTEGER);

*** Sample DB ***
INSERT INTO store (name, address, icon) VALUES ('demo', 'demo', 'demo');
INSERT INTO store (name, address, icon) VALUES ('demo1', 'demo1', 'demo1');

INSERT INTO category (name, icon) VALUES ('demo', 'demo');
INSERT INTO category (name, icon) VALUES ('demo1', 'demo1');

INSERT INTO product (categoryID, name, icon, image) VALUES (1, 'demo', 'demo','demo');
INSERT INTO product (categoryID, name, icon, image) VALUES (2, 'demo1', 'demo1','demo1');

INSERT INTO orders (storeID, type, date, note) VALUES (1, 0, null,'Nhap KHo');
INSERT INTO orders (storeID, type, date, note) VALUES (null, 1, null,'Ban');

INSERT INTO order_detail (ordersID, productID, price) VALUES (1, 1, 100);
INSERT INTO order_detail (ordersID, productID, price) VALUES (2, 1, 100);
****
SELECT * FROM product, category WHERE product.categoryID = category.ID
