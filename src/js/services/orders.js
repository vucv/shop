angular.module('myApp.services.orders', [])
    .factory('ordersDB', function (DB) {
        var self = this;

        self.all = function () {
            return DB.query('SELECT orders.*, name FROM orders, store WHERE orders.storeID = store.ID')
                .then(function (result) {
                    var days = {};
                    for (var i = 0; i < result.rows.length; i++) {
                        if(!days[result.rows.item(i).date]) {
                            days[result.rows.item(i).date]={};
                            days[result.rows.item(i).date].title=result.rows.item(i).date;
                            days[result.rows.item(i).date].orders=[];
                        }
                        days[result.rows.item(i).date].orders.push(result.rows.item(i));
                    }
                    return days;
                });
        };

        self.allSale = function () {
            return DB.query('SELECT * FROM orders,order_detail, product '
                +'WHERE orders.ID = order_detail.ordersID and order_detail.productID=product.ID and orders.type = 1')
                .then(function (result) {
                    var days = {};
                    for (var i = 0; i < result.rows.length; i++) {
                        if(!days[result.rows.item(i).date]) {
                            days[result.rows.item(i).date]={};
                            days[result.rows.item(i).date].title=result.rows.item(i).date;
                            days[result.rows.item(i).date].orders=[];
                        }
                        days[result.rows.item(i).date].orders.push(result.rows.item(i));
                    }
                    return days;
                });
        };

        self.getById = function (id) {
            return DB.query('SELECT orders.*, address, tel, name FROM orders, store WHERE orders.storeID = store.ID and orders.id = ?', [id])
                .then(function (result) {
                    console.log(JSON.stringify(result));
                    return DB.fetch(result);
                });
        };

        self.create = function (storeID, type, date, note) {

            return DB.query('INSERT INTO orders (storeID, type, date, note) VALUES ( ?,?,?,?)', [storeID, type, date, note])
                .then(function (result) {
                    return result;
                });
        };

        self.updateByID = function (id, storeID, date, note) {
            return DB.query('UPDATE orders SET storeID=?,date=?,note=? WHERE ID = ?;', [storeID, date, note, id])
                .then(function (result) {
                    return result;
                });
        };

        self.deleteByID = function (id) {
            return DB.query('DELETE FROM store WHERE ID = ?', [id])
                .then(function (result) {
                    console.log(JSON.stringify(result));
                    return result;
                });
        };

        self.addDetail = function (ordersID, productID, total, price) {

            return DB.query('INSERT INTO order_detail (ordersID, productID, total, price) VALUES ( ?,?,?,?)', [ordersID, productID, total, price])
                .then(function (result) {
                    return result;
                });
        };

        return self;
    });