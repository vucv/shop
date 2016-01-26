angular.module('MyApp.controllers.store', ['myApp.services.store', 'ngRoute'])

    .controller('store', function ($scope, $location, $routeParams, storeDB) {
        $scope.stores = [];
        $scope.store;
        storeDB.all().then(function (stores) {
            $scope.stores = stores;
        });
        storeDB.getById($routeParams.id).then(function (store) {
            console.log($routeParams.id + "/" + store);
            $scope.store = store;
        });

        $scope.getAll = function () {
            storeDB.all().then(function (stores) {
                return stores;
            });
        };

        $scope.save = function () {
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
            storeDB.deleteByID(id)
                .then(function () {
                    //Do somethin
                    $location.path('/store');
                });
        };
        $scope.selectedItem = function (store) {
            $scope.store = store;
            $location.path('/store/view');
        };
    });