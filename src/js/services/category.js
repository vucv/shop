angular.module('myApp.services.category', [])
    .factory('categoryDB', function (DB) {
        var self = this;

        self.all = function () {
            return DB.query('SELECT * FROM category')
                .then(function (result) {
                    return DB.fetchAll(result);
                });
        };

        self.getById = function (id) {
            return DB.query('SELECT * FROM category WHERE id = ?', [id])
                .then(function (result) {
                    console.log(JSON.stringify(result));
                    return DB.fetch(result);
                });
        };

        self.create = function (name, icon) {

            return DB.query('INSERT INTO category (name, icon) VALUES ( ?,?)', [name, icon])
                .then(function (result) {
                    return result;
                });
        };

        self.updateByID = function (id, name, icon) {
            return DB.query('UPDATE category SET name = ?, icon = ? WHERE ID = ?;', [name, icon, id])
                .then(function (result) {
                    return result;
                });
        };

        self.deleteByID = function (id) {
            return DB.query('DELETE FROM category WHERE ID = ?', [id])
                .then(function (result) {
                    console.log(JSON.stringify(result));
                    return result;
                });
        };

        return self;
    });