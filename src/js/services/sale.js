angular.module('myApp.services.sale', [])
    .factory('saleDB', function (DB) {
        var self = this;

        self.all = function () {
            return DB.query('SELECT * FROM sale ORDER BY sale.date DESC')
                .then(function (result) {
                    return self.fetchSale(result);
                });
        };
        self.allToday = function () {
            var today = new Date(new Date().toLocaleDateString() + " 0:0:0").getTime();
            return DB.query('SELECT sale.*, product.name productName, category.icon icon,category.ID categoryID FROM sale LEFT JOIN product ON sale.productID=product.ID LEFT JOIN category ON product.categoryID = category.ID WHERE sale.date>? ORDER BY sale.date DESC',[today])
                .then(function (result) {
                    return DB.fetchAll(result);
                });
        };

        self.fetchSale = function(result){
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

        self.getById = function (id) {
            return DB.query('SELECT sale.*, product.name productName, category.icon icon,category.ID categoryID FROM sale LEFT JOIN product ON sale.productID=product.ID LEFT JOIN category ON product.categoryID = category.ID WHERE sale.ID = ?', [id])
                .then(function (result) {
                    return DB.fetch(result);
                });
        };

        self.create = function (date,productID, price) {

            return DB.query('INSERT INTO sale (date,productID, price) VALUES ( ?,?,?)', [date,productID, price])
                .then(function (result) {
                    return result;
                });
        };

        self.updateByID = function (id, date, productID, price) {
            return DB.query('UPDATE sale SET date = ?, productID = ?, price = ? WHERE ID = ?;', [date, productID, price, id])
                .then(function (result) {
                    return result;
                });
        };

        self.deleteByID = function (id) {
            return DB.query('DELETE FROM sale WHERE ID = ?', [id])
                .then(function (result) {
                    return result;
                });
        };

        return self;
    });