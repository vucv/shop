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
            return DB.query('SELECT category.*, sum(CASE WHEN orders.type= 0 then total End) im,sum(CASE WHEN orders.type= 0 then total*order_detail.price End) imValue,sum(CASE WHEN orders.type= 1 then total End) ex, sum(CASE WHEN orders.type= 1 then total*order_detail.price End) exValue FROM category LEFT JOIN product ON category.ID = product.categoryID LEFT JOIN order_detail ON product.ID = order_detail.productID LEFT JOIN orders ON orders.ID = order_detail.ordersID WHERE category.ID = ?', [id])
                .then(function (result) {
                    console.log(JSON.stringify(result));
                    return DB.fetch(result);
                });
        };

        self.getListProduct = function (id) {

            return DB.query('SELECT product.*, sum(CASE WHEN orders.type= 0 then total End) im,sum(CASE WHEN orders.type= 0 then total*order_detail.price End) imValue, sum(CASE WHEN orders.type= 1 then total End) ex,sum(CASE WHEN orders.type= 1 then total*order_detail.price End) exValue FROM product, category,orders, order_detail WHERE product.categoryID = category.ID and product.ID = order_detail.productID and order_detail.ordersID = orders.ID and category.ID= ? GROUP BY product.ID', [id])
                .then(function (result) {
                    return DB.fetchAll(result);
                });
        };

        self.create = function (name, icon) {

            return DB.query('INSERT INTO category (ID,name, icon) VALUES ( ?,?,?)', [DB.generateUUID(),name, icon])
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