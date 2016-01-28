angular.module('myApp.services.product', [])
    .factory('productDB', function (DB) {
        var self = this;

        self.all = function () {
            return DB.query('SELECT * FROM product')
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
            return DB.query('SELECT product.*, category.name category FROM product,category  WHERE product.ID=category.ID and product.ID = ?', [id])
                .then(function (result) {
                    console.log(JSON.stringify(result));
                    return DB.fetch(result);
                });
        };

        self.create = function (categoryID, name, icon, image) {

            return DB.query('INSERT INTO product (categoryID, name, icon, image) VALUES ( ?,?,?,?)', [categoryID, name, icon, image])
                .then(function (result) {
                    return result;
                });
        };

        self.updateByID = function (id, categoryID, name, icon, image) {
            return DB.query('UPDATE product SET categoryID=?,name=?,icon=?, image=? WHERE ID = ?;', [categoryID, name, icon, image, id])
                .then(function (result) {
                    return result;
                });
        };

        self.deleteByID = function (id) {
            return DB.query('DELETE FROM product WHERE ID = ?', [id])
                .then(function (result) {
                    console.log(JSON.stringify(result));
                    return result;
                });
        };

        return self;
    });