angular.module('myApp.services.store', [])
    .factory('storeDB', function (DB) {
        var self = this;

        self.all = function () {
            return DB.query('SELECT * FROM store')
                .then(function (result) {
                    return DB.fetchAll(result);
                });
        };

        self.allByProductID = function (id) {
            return DB.query('SELECT store.*, orders.date date, COUNT(1) number, SUM(total) im, SUM(order_detail.price*total) imValue FROM order_detail LEFT JOIN orders ON order_detail.ordersID=orders.ID LEFT JOIN store ON orders.storeID = store.ID LEFT JOIN product ON product.ID =order_detail.productID LEFT JOIN category ON category.ID =product.categoryID WHERE orders.type = 0 and product.ID=? GROUP BY store.ID ORDER BY orders.date',[id])
                .then(function (result) {
                    return DB.fetchAll(result);
                });
        };

        self.getIdByName = function (name) {
            return DB.query('SELECT * FROM store WHERE name = ?', [name])
                .then(function (result) {
                    if(result.rows.length != 0){
                        return result.rows.item(0).ID;
                    }else{
                        return self.create (name).then(function (result){
                            return result.insertId;
                        });
                    }
                });
        };

        self.getById = function (id) {
            return DB.query('SELECT store.*, sum(CASE WHEN orders.type= 0 then total End) im,sum(CASE WHEN orders.type= 0 then total*order_detail.price End) imValue FROM store LEFT JOIN orders ON store.ID = orders.storeID LEFT JOIN order_detail ON orders.ID = order_detail.ordersID WHERE store.ID = ?', [id])
                .then(function (result) {
                    console.log(JSON.stringify(result));
                    return DB.fetch(result);
                });
        };

        self.create = function (name, address, icon, tel) {

            return DB.querySync('INSERT INTO store (ID,name, address, icon, tel) VALUES ( ?,?,?,?,?)', [DB.generateUUID(),name, address, icon, tel])
                .then(function (result) {
                    return result;
                });
        };

        self.updateByID = function (id, name, address, icon, tel) {
            return DB.querySync('UPDATE store SET name=?,address=?,icon=?, tel=? WHERE ID = ?;', [name, address, icon, tel, id])
                .then(function (result) {
                    return result;
                });
        };

        self.deleteByID = function (id) {
            return DB.querySync('DELETE FROM store WHERE ID = ?', [id])
                .then(function (result) {
                    console.log(JSON.stringify(result));
                    return result;
                });
        };

        return self;
    });