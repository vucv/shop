angular.module('MyApp.controllers.store', ['myApp.services.store', 'myApp.services.orders', 'ngRoute'])

    .controller('store', function ($scope, $location, $routeParams, storeDB, ordersDB) {
        $scope.stores = [];
        $scope.store;
        storeDB.all().then(function (stores) {
            $scope.stores = stores;
        });
        if($routeParams.id) {
            storeDB.getById($routeParams.id).then(function (store) {
                $scope.store = store;
            });

            ordersDB.allByStoreID($routeParams.id).then(function (listOrder) {
                $scope.listOrder = listOrder;
            });
        }
        $scope.getAll = function () {
            storeDB.all().then(function (stores) {
                return stores;
            });
        };

        $scope.save = function () {
            //Validate
            if (!$scope.store || !$scope.store.name || !$scope.store.address) {
                alert("Vui lòng nhập đầy đủ thông tin");
                return;
            }
            if (!$scope.store.ID) {
                storeDB.create($scope.store.name, $scope.store.address, $scope.store.icon, $scope.store.tel)
                    .then(function (result) {
                        //Do something
                        if (result.rowsAffected != 0) {
                            $location.path('/store');
                        } else {
                            alert("Quá trình lưu bị lỗi !!!")
                        }
                    });
            }else{
                storeDB.updateByID($scope.store.ID, $scope.store.name, $scope.store.address, $scope.store.icon, $scope.store.tel)
                    .then(function (result) {
                        //Do something
                        if (result.rowsAffected != 0) {
                            $location.path('/store');
                        } else {
                            alert("Quá trình lưu bị lỗi !!!")
                        }
                    });
            }
        };

        $scope.deleteStore = function (id) {
            if(!$scope.listOrder.isEmpty){
                alert("Phải xóa hết hóa đơn của shop \"" + $scope.store.name + "\" trước !!!");
                return;
            }
            var ok = confirm("Xóa cửa hàng " + $scope.store.name + " ?");
            if (ok) {
                storeDB.deleteByID(id)
                    .then(function () {
                        //Do somethin
                        $location.path('/store');
                    });
            }
        };

        $scope.detail = function (date) {
            $scope.orderInDate = $scope.listOrder[date];
        };
    });