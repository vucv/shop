angular.module('MyApp.controllers.product', ['myApp.services.product', 'myApp.services.category', 'ngRoute'])

    .controller('product', function ($scope, $location, $routeParams, productDB, categoryDB) {
        $scope.products = [];
        $scope.product;
        productDB.all().then(function (products) {
            $scope.products = products;
        });

        categoryDB.all().then(function (categories) {
            $scope.categories = categories;
        });

        productDB.getById($routeParams.id).then(function (product) {
            $scope.product = product;
        });

        $scope.save = function () {
            if (!$scope.product.ID) {
                productDB.create($scope.product.categoryID, $scope.product.name, $scope.product.icon, $scope.product.image)
                    .then(function (result) {
                        //Do something
                        if (result.rowsAffected != 0) {
                            $location.path('/product');
                        } else {
                            alert("Quá trình lưu bị lỗi !!!")
                        }
                    });
            }else{
                productDB.updateByID($scope.product.ID, $scope.product.categoryID, $scope.product.name, $scope.product.icon, $scope.product.image)
                    .then(function (result) {
                        //Do something
                        if (result.rowsAffected != 0) {
                            $location.path('/product');
                        } else {
                            alert("Quá trình lưu bị lỗi !!!")
                        }
                    });
            }
        };
        $scope.deleteStore = function (id) {
            productDB.deleteByID(id)
                .then(function () {
                    //Do somethin
                    $location.path('/product');
                });
        };
    });