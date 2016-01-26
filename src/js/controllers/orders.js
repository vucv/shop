angular.module('MyApp.controllers.orders', ['myApp.services.orders','myApp.services.store',
    'myApp.services.category', 'ngRoute'])

    .controller('orders', function ($scope, $location, $routeParams, ordersDB, storeDB, categoryDB) {
        $scope.orders = [];
        $scope.order;
        $scope.orderDetails= [];
        $scope.orderDetail ={};
        $scope.stores=[];
        $scope.categorys=[];
        $scope.today= new Date().toLocaleDateString();

        ordersDB.all().then(function (orders) {
            $scope.orders = orders;
        });
        //Get list shop store
        storeDB.all().then(function (stores) {
            $scope.stores = stores;
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
                ordersDB.create($scope.order.storeID, 0, $scope.order.date.toLocaleDateString(), $scope.order.note)
                    .then(function (result) {
                        //Do something
                        if (result.rowsAffected != 0) {
                            $location.path('/orders');
                        } else {
                            alert("Quá trình lưu bị lỗi !!!")
                        }
                    });
            }else{
                ordersDB.updateByID($scope.order.ID, $scope.order.storeID, $scope.order.date.toLocaleDateString(), $scope.order.note)
                    .then(function (result) {
                        //Do something
                        if (result.rowsAffected != 0) {
                            $location.path('/orders');
                        } else {
                            alert("Quá trình lưu bị lỗi !!!")
                        }
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