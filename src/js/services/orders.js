angular.module('myApp.services.orders', [])
    .factory('ordersDB', function (DB) {
        var self = this;

        self.all = function () {
            return DB.query('SELECT orders.*, name FROM orders, store WHERE orders.storeID = store.ID ORDER BY orders.date ASC')
                .then(function (result) {
                    return DB.fetchOder(result);
                });
        };

        self.allByStoreID = function (id) {
            return DB.query('SELECT order_detail.*,product.name name, category.icon icon, orders.date date FROM order_detail LEFT JOIN orders ON order_detail.ordersID=orders.ID LEFT JOIN store ON orders.storeID = store.ID LEFT JOIN product ON product.ID =order_detail.productID LEFT JOIN category ON category.ID =product.categoryID WHERE store.ID=? ORDER BY orders.date', [id])
                .then(function (result) {
                    return DB.fetchOder(result);
                });
        };

        self.allSale = function () {
            return DB.query('SELECT * FROM orders,order_detail, product '
                + 'WHERE orders.ID = order_detail.ordersID and order_detail.productID=product.ID and orders.type = 1')
                .then(function (result) {
                    return DB.fetchOder(result);
                });
        };

        self.getById = function (id) {
            return DB.query('SELECT orders.*, address, tel, store.name storeName FROM orders, store WHERE orders.storeID = store.ID and orders.id = ?', [id])
                .then(function (result) {
                    console.log(JSON.stringify(result));
                    return DB.fetch(result);
                });
        };

        self.getOderDetailById = function (id) {
            return DB.query('SELECT order_detail.* ,product.name productName, category.ID categoryID FROM order_detail LEFT JOIN product ON order_detail.productID = product.ID LEFT JOIN category ON product.categoryID = category.ID WHERE order_detail.ordersID = ?', [id])
                .then(function (result) {
                    console.log(JSON.stringify(result));
                    return DB.fetchAll(result);
                });
        };
        self.deleteOderDetailById = function (id) {
            return DB.query('DELETE FROM order_detail WHERE order_detail.ID = ?', [id])
                .then(function (result) {
                    return result;
                });
        };

        self.create = function (storeID, type, date, note) {

            return DB.query('INSERT INTO orders (ID,storeID, type, date, note) VALUES ( ?,?,?,?,?)', [DB.generateUUID(),storeID, type, date, note])
                .then(function (result) {
                    return result;
                });
        };

        self.updateByID = function (id, storeID, date) {
            return DB.query('UPDATE orders SET storeID=?,date=? WHERE ID = ?;', [storeID, date, id])
                .then(function (result) {
                    return result;
                });
        };

        self.deleteByID = function (id) {
            return DB.query('DELETE FROM orders WHERE ID = ?', [id])
                .then(function (result) {
                    return result;
                });
        };

        self.addDetail = function (ordersID, productID, total, price) {

            return DB.query('INSERT INTO order_detail (ID,ordersID, productID, total, price) VALUES ( ?,?,?,?,?)', [DB.generateUUID(),ordersID, productID, total, price])
                .then(function (result) {
                    return result;
                });
        };
        self.editDetail = function (ID, productID, total, price) {

            return DB.query('UPDATE order_detail SET productID=?,total=?,price=? WHERE ID = ?', [productID, total, price,ID])
                .then(function (result) {
                    return result;
                });
        };

        self.sortOrder = function (listOrder) {

            return listOrder;
        }

        return self;
    });