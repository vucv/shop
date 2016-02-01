angular.module('MyApp.controllers.product', ['myApp.services.product', 'myApp.services.category', 'myApp.services.store', 'ngRoute'])

    .controller('product', function ($scope, $location, $routeParams, productDB, categoryDB, storeDB) {
        $scope.products = [];
        $scope.product;
        productDB.all().then(function (products) {
            $scope.products = products;
        });

        categoryDB.all().then(function (categories) {
            $scope.categories = categories;
        });

        if($routeParams.id){
            productDB.getById($routeParams.id).then(function (product) {
                $scope.product = product;
            });

            storeDB.allByProductID($routeParams.id).then(function (listStore) {
                $scope.listStore = listStore;
            });
        }

        $scope.save = function () {
            if (!$scope.product || !$scope.product.categoryID || !$scope.product.name) {
                alert("Vui lòng nhập đầy đủ thông tin");
                return;
            }
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
            if($scope.listStore.length != 0){
                alert("Phải xóa hết các hóa đơn mua bán sản phẩm \"" + $scope.product.name + "\" trước !!!");
                return;
            }
            var ok = confirm("Xóa sản phầm " + $scope.product.name + " ?");
            if (ok) {
                productDB.deleteByID(id)
                    .then(function () {
                        //Do somethin
                        $location.path('/product');
                    });
            }
        };
    });