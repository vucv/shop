angular.module('MyApp.controllers.category', ['myApp.services.category', 'ngRoute'])

    .controller('category', function ($scope, $location, $routeParams, categoryDB) {
        $scope.categorys = [];
        $scope.category;
        categoryDB.all().then(function (categorys) {
            $scope.categorys = categorys;
        });

        if ($routeParams.id) {
            categoryDB.getById($routeParams.id).then(function (category) {
                $scope.category = category;
            });

            categoryDB.getListProduct($routeParams.id).then(function (listProduct) {
                $scope.listProduct = listProduct;
            });
        }

        $scope.getAll = function () {
            categoryDB.all().then(function (categorys) {
                return categorys;
            });
        };

        $scope.iconList = ['ao1', 'ao2', 'ao3', 'ao4',
            'dam1', 'dam2', 'dam3', 'dam4',
            'jean1', 'jean2', 'jean3', 'jean4'];

        $scope.save = function () {
            //Validate
            if (!$scope.category || !$scope.category.name || !$scope.category.icon) {
                alert("Vui lòng nhập đầy đủ thông tin");
                return;
            }
            if (!$scope.category.ID) {
                categoryDB.create($scope.category.name, $scope.category.icon)
                    .then(function (result) {
                        //Do something
                        if (result.rowsAffected != 0) {
                            $location.path('/category');
                        } else {
                            alert("Quá trình lưu bị lỗi !!!")
                        }
                    });
            } else {
                categoryDB.updateByID($scope.category.ID, $scope.category.name, $scope.category.icon)
                    .then(function (result) {
                        //Do something
                        if (result.rowsAffected != 0) {
                            $location.path('/category');
                        } else {
                            alert("Quá trình lưu bị lỗi !!!")
                        }
                    });
            }
        };

        $scope.delete = function (id) {
            //
            if($scope.listProduct.length!=0){
                alert("Phải xóa hết các sản phẩm trong \"" + $scope.category.name +"\" !!!");
                return;
            }
            var ok = confirm("Xóa loại " + $scope.category.name + " ?");
            if (ok) {
                categoryDB.deleteByID(id)
                    .then(function () {
                        //Do somethin
                        $location.path('/category');
                    });
            }

        };
    });