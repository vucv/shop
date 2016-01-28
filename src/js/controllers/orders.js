angular.module('MyApp.controllers.orders', ['myApp.services.orders','myApp.services.store',
    'myApp.services.category','myApp.services.product', 'ngRoute'])

    .controller('orders', function ($scope, $location, $routeParams, ordersDB, storeDB, categoryDB, productDB) {
        $scope.orders = [];
        $scope.order;
        $scope.orderDetails= [];
        $scope.orderDetail ={};
        $scope.stores=[];
        $scope.categorys=[];
        $scope.today= new Date().toLocaleDateString();

        ordersDB.all().then(function (orders) {
            $scope.orders = orders;
            $scope.listdate = Object.keys(orders);
        });
        //Get list shop store
        storeDB.all().then(function (stores) {
            $scope.stores = stores;
        });
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
            storeDB.getIdByName($scope.order.storeName).then(function (storeID) {
                if (!$scope.order.ID) {
                    ordersDB.create(storeID, 0, $scope.order.date.toLocaleDateString(), $scope.order.note)
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
                    ordersDB.updateByID($scope.order.ID, storeID, $scope.order.date.toLocaleDateString(), $scope.order.note)
                        .then(function (result) {
                            //Do something
                            if (result.rowsAffected != 0) {
                                $location.path('/orders');
                            } else {
                                alert("Quá trình lưu bị lỗi !!!")
                            }
                        });
                }
            });

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
                                $location.path('/orders');
                            }
                        });
                });

            }
        };

        $scope.delete = function (id) {
            ordersDB.deleteByID(id)
                .then(function () {
                    //Do somethin
                    $location.path('/category');
                });
        };

        $scope.addOrderDetail = function () {
            $scope.orderDetails.push($scope.orderDetail);
            $scope.orderDetail={};
        };
    });