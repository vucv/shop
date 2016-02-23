angular.module('myApp.services.product', [])
    .factory('productDB', function (DB,syncDB) {
        var self = this;

        self.all = function () {
            return DB.query('SELECT product.*, category.icon FROM product LEFT JOIN category ON  product.categoryID = category.ID')
                .then(function (result) {
                    return DB.fetchAll(result);
                });
        };

        self.getIdByName = function (name, categoryID) {
            return DB.query('SELECT * FROM product WHERE name = ?', [name])
                .then(function (result) {
                    if(result.rows.length != 0){
                        return result.rows.item(0).ID;
                    }else{
                        return self.create (categoryID, name).then(function (result){
                            return result.insertId;
                        });
                    }
                });
        };

        self.getById = function (id) {
            return DB.query('SELECT product.*, category.name category, sum(CASE WHEN orders.type= 0 then total End) im, sum(CASE WHEN orders.type= 1 then total End) ex FROM product LEFT JOIN category ON product.ID=category.ID LEFT JOIN order_detail ON order_detail.productID=product.ID LEFT JOIN orders ON order_detail.ordersID =orders.ID WHERE product.ID = ?', [id])
                .then(function (result) {
                    console.log(JSON.stringify(result));
                    return DB.fetch(result);
                });
        };

        self.create = function (categoryID, name, icon, image) {

            return syncDB.querySync('INSERT INTO product (ID,categoryID, name, icon, image) VALUES ( ?,?,?,?,?)', [DB.generateUUID(),categoryID, name, icon, image])
                .then(function (result) {
                    return result;
                });
        };

        self.updateByID = function (id, categoryID, name, icon, image) {
            return syncDB.querySync('UPDATE product SET categoryID=?,name=?,icon=?, image=? WHERE ID = ?;', [categoryID, name, icon, image, id])
                .then(function (result) {
                    return result;
                });
        };

        self.deleteByID = function (id) {
            return syncDB.querySync('DELETE FROM product WHERE ID = ?', [id])
                .then(function (result) {
                    console.log(JSON.stringify(result));
                    return result;
                });
        };

        return self;
    });