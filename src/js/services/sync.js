angular.module('myApp.services.syncDB', [])
    .factory('syncDB', function (DB, $http) {
        var self = this;

        self.syncTime = function () {
            var syncTime = localStorage.getItem('timestamp');
            return syncTime ? syncTime : 0;
        };


        self.syncAll = function () {
            var req = {
                method: 'GET',
                url: 'http://localhost:4000/all',
                headers: { 'Content-Type': 'undefined' ,Accept: 'application/json'}
            }

            $http(req).then(function (response) {
                if (response.status == 200) {
                    //Call
                    localStorage.setItem('timestamp', new Date().getTime());
                    self.insertDB(response.data);
                }
            }, function () {

            });
        };

        self.insertDB = function (database) {
            angular.forEach(database.tables, function (table) {
                var columns = [];

                angular.forEach(table.columns, function (column) {
                    columns.push(column.name);
                });

                angular.forEach(table.rows, function (row) {
                    var values = [];
                    angular.forEach(table.columns, function (column) {
                        values.push("'" + row[column.name] + "'");
                    });
                    var query = 'INSERT INTO ' + table.name + ' (' + columns.join(',') + ') VALUES (' + values.join(',') + ')';
                    DB.query(query);
                });

            });
        };

        self.syncWithTime = function (timestamp) {
            var req = {
                method: 'GET',
                url: 'http://localhost:4000/sync',
                headers: { 'Content-Type': 'undefined' ,Accept: 'application/json'},
                params: {timestamp: timestamp}
            }

            $http(req).then(function (response) {
                if (response.status == 200) {
                    //Call
                    localStorage.setItem('timestamp', new Date().getTime());
                    self.syncDB(response.data);
                }
            }, function () {

            });
        };

        self.uploadSync = function () {

            DB.query('SELECT * FROM sync_table')
                .then(function (result) {
                    var rows = DB.fetchAll(result);
                    var req = {
                        method: 'POST',
                        url: 'http://localhost:4000/sync',
                        headers: { 'Content-Type': 'undefined' ,Accept: 'application/json'},
                        params: {commands: JSON.stringify(rows)}
                    }

                    $http(req).then(function (response) {
                        if (response.status == 200) {
                            //Call cleanSyncDB
                            self.cleanSyncDB();
                        }
                    }, function () {

                    });
                });


        };

        self.syncDB = function (commands) {
            angular.forEach(commands, function (command) {
                DB.query(command.query, JSON.parse(command.bindings));
            });
            self.uploadSync();
        };

        self.cleanSyncDB = function () {
            return DB.querySync('DELETE FROM sync_table')
                .then(function (result) {
                    console.log(JSON.stringify(result));
                    return result;
                });
        };


        return self;
    });