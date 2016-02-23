angular.module('myApp.services', ['myApp.config'])
// DB wrapper
    .factory('DB', function ($q, DB_CONFIG) {
        var self = this;
        self.db = null;

        self.init = function () {
            // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
            self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

            angular.forEach(DB_CONFIG.tables, function (table) {
                var columns = [];

                angular.forEach(table.columns, function (column) {
                    columns.push(column.name + ' ' + column.type);
                });

                var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
                self.query(query);
                console.log('Table ' + table.name + ' initialized');
            });
        };

        self.query = function (query, bindings) {
            bindings = typeof bindings !== 'undefined' ? bindings : [];
            var deferred = $q.defer();

            self.db.transaction(function (transaction) {
                transaction.executeSql(query, bindings, function (transaction, result) {
                    deferred.resolve(result);
                }, function (transaction, error) {
                    deferred.reject(error);
                });
            });

            return deferred.promise;
        };

        self.querySync = function (query, bindings) {
            self.addCommand(query, bindings);
            return self.query(query, bindings);
        };


        self.addCommand = function (query,bindings) {
            return self.query('INSERT INTO sync_table (query,bindings,timestamp) VALUES ( ?,?,?)', [query,JSON.stringify(bindings), new Date().getTime()])
                .then(function (result) {
                    return result;
                });
        };


        self.fetchAll = function (result) {
            var output = [];

            for (var i = 0; i < result.rows.length; i++) {
                output.push(result.rows.item(i));
            }

            return output;
        };

        self.fetch = function (result) {
            if (result.rows.length != 0) {
                return result.rows.item(0);
            }
            return {};
        };

        self.fetchOder = function (result) {
            var days = {};
            if (result.rows.length == 0) {
                days.isEmpty = true;
            }
            for (var i = 0; i < result.rows.length; i++) {
                var title = new Date(result.rows.item(i).date).toLocaleDateString();
                if (!days[title]) {
                    days[title] = {};
                    days[title].title = title;
                    if(days[title].title==new Date().toLocaleDateString()){
                        days[title].title = "Hôm nay";
                    }
                    days[title].total = 0;
                    days[title].price = 0;
                    days[title].orders = [];
                }
                days[title].orders.push(result.rows.item(i));
                if (isNaN(Number(result.rows.item(i).total))) {
                    result.rows.item(i).total = 0;
                }
                if (isNaN(Number(result.rows.item(i).price))) {
                    result.rows.item(i).price = 0;
                }
                days[title].total += result.rows.item(i).total;
                days[title].price += (result.rows.item(i).price * result.rows.item(i).total);
            }
            return days;
        };

        self.generateUUID = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        };

        return self;
    })
// Resource service example
    .factory('DBService', function (DB) {
        var self = this;

        self.all = function (table) {
            return DB.query('SELECT * FROM ' + table)
                .then(function (result) {
                    return DB.fetchAll(result);
                });
        };

        self.getById = function (id, table) {
            return DB.query('SELECT * FROM ' + table + ' WHERE id = ?', [id])
                .then(function (result) {
                    return DB.fetch(result);
                });
        };

        self.create = function (table, value) {

            return DB.query('SELECT * FROM ' + table + ' WHERE id = ?', [id])
                .then(function (result) {
                    return DB.fetch(result);
                });
        };

        self.updateByID = function (table) {
            return DB.query('SELECT * FROM ' + table + ' WHERE id = ?', [id])
                .then(function (result) {
                    return DB.fetch(result);
                });
        };

        self.deleteByID = function (id, table) {
            return DB.query('SELECT * FROM ' + table + ' WHERE id = ?', [id])
                .then(function (result) {
                    return DB.fetch(result);
                });
        };


        return self;
    });