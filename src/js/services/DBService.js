angular.module('myApp.services', ['myApp.config'])
// DB wrapper
.factory('DB', function($q, DB_CONFIG) {
    var self = this;
    self.db = null;

    self.init = function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];

            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });

            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
            console.log('Table ' + table.name + ' initialized');
        });
    };

    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

    self.fetchAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }

        return output;
    };

    self.fetch = function(result) {
        if(result.rows.length != 0){
            return result.rows.item(0);
        }
        return {};
    };

    return self;
})
// Resource service example
.factory('DBService', function(DB) {
    var self = this;

    self.all = function(table) {
        return DB.query('SELECT * FROM '+ table)
        .then(function(result){
            return DB.fetchAll(result);
        });
    };

    self.getById = function(id, table) {
        return DB.query('SELECT * FROM '+ table +' WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };

    self.create = function(table, value) {

        return DB.query('SELECT * FROM '+ table +' WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };

    self.updateByID = function(table) {
        return DB.query('SELECT * FROM '+ table +' WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };

    self.deleteByID = function(id, table) {
        return DB.query('SELECT * FROM '+ table +' WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };


    return self;
});