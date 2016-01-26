angular.module('myApp.services.store', [])
    .factory('storeDB', function (DB) {
        var self = this;

        self.all = function () {
            return DB.query('SELECT * FROM store')
                .then(function (result) {
                    return DB.fetchAll(result);
                });
        };

        self.getById = function (id) {
            return DB.query('SELECT * FROM store WHERE id = ?', [id])
                .then(function (result) {
                    console.log(JSON.stringify(result));
                    return DB.fetch(result);
                });
        };

        self.create = function (name, address, icon, tel) {

            return DB.query('INSERT INTO store (name, address, icon, tel) VALUES ( ?,?,?,?)', [name, address, icon, tel])
                .then(function (result) {
                    return result;
                });
        };

        self.updateByID = function (id, name, address, icon, tel) {
            return DB.query('UPDATE store SET name=?,address=?,icon=?, tel=? WHERE ID = ?;', [name, address, icon, tel, id])
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