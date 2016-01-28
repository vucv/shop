angular.module('MyApp.controllers.sale', ['myApp.services.orders','myApp.services.store',
    'myApp.services.category','myApp.services.product', 'ngRoute'])

    .controller('sale', function ($scope, $location, $routeParams, ordersDB, storeDB, categoryDB, productDB) {
        $scope.orders = [];
        $scope.order;
        $scope.orderDetails= [];
        $scope.orderDetail ={};
        $scope.stores=[];
        $scope.categorys=[];
        $scope.today= new Date().toLocaleDateString();

        ordersDB.allSale().then(function (orders) {
            $scope.orders = orders;
        });
        //Get list shop store
        productDB.all().then(function (products) {
            $scope.products = products;
        });

        categoryDB.all().then(function (categorys) {
            $scope.categorys = categorys;
        });

        ordersDB.getById($routeParams.id).then(function (order) {
            $scope.order = order;
        });

        $scope.getAll = function () {
            ordersDB.all().then(function (orders) {
                return orders;
            });
        };


        $scope.save = function () {
            if (!$scope.order.ID) {
                ordersDB.create(null, 1, $scope.order.date.toLocaleDateString(), $scope.order.note)
                    .then(function (result) {
                        //Do something
                        if (result.rowsAffected != 0) {
                            //Insert order details
                            addDetail(result.insertId);
                        } else {
                            alert("Quá trình lưu bị lỗi !!!")
                        }
                    });
            }else{
                ordersDB.updateByID($scope.order.ID, null, $scope.order.date.toLocaleDateString(), $scope.order.note)
                    .then(function (result) {
                        //Do something
                        if (result.rowsAffected != 0) {
                            $location.path('/sales');
                        } else {
                            alert("Quá trình lưu bị lỗi !!!")
                        }
                    });
            }
        };

        function addDetail (orderID) {
            var count = $scope.orderDetails.length ;
            for (var i = 0; i < $scope.orderDetails.length; i++) {
                var total = $scope.orderDetails[i].total;
                var price = $scope.orderDetails[i].price;
                productDB.getIdByName($scope.orderDetails[i].productName,
                    $scope.orderDetails[i].categoryID)
                    .then(function (productID) {
                    ordersDB.addDetail(orderID,productID, total, price)
                        .then(function (result) {
                            //Do something
                            count --;
                            if (count == 0) {
                                $location.path('/sales');
                            }
                        });
                });

            }
        };

        $scope.delete = function (id) {
            ordersDB.deleteByID(id)
                .then(function () {
                    //Do somethin
                    $location.path('/sales');
                });
        };

        $scope.addOrderDetail = function () {
            $scope.orderDetails.push($scope.orderDetail);
            $scope.orderDetail={};
        };
    });