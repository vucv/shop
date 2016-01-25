angular.module('myApp.services.store', [])
.factory('storeDB', function(DB) {
    var self = this;

    self.all = function() {
        return DB.query('SELECT * FROM store')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };

    self.getById = function(id) {
        return DB.query('SELECT * FROM store WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };

    self.create = function(name, address, icon, tel) {

        return DB.query('INSERT INTO store (name, address, icon, tel) VALUES ( ?,?,?,?)', [name, address, icon, tel])
        .then(function(result){
            return result;
        });
    };

    self.updateByID = function(table) {
        return DB.query('SELECT * FROM '+ table +' WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };

    self.deleteByID = function(id) {
        return DB.query('DELETE FROM store WHERE ID = ?', [id])
        .then(function(result){
            return result;
        });
    };

    return self;
});