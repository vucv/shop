angular.module('myApp.services.orders', [])
    .factory('ordersDB', function (DB) {
        var self = this;

        self.all = function () {
            return DB.query('SELECT orders.* FROM orders, store WHERE orders.storeID = store.ID')
                .then(function (result) {
                    return DB.fetchAll(result);
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
            return DB.query('UPDATE store SET storeID=?,date=?,note=? WHERE ID = ?;', [storeID, date, note, id])
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

        return self;
    });