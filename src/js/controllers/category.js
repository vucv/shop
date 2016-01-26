angular.module('MyApp.controllers.category', ['myApp.services.category', 'ngRoute'])

    .controller('category', function ($scope, $location, $routeParams, categoryDB) {
        $scope.categorys = [];
        $scope.category;
        categoryDB.all().then(function (categorys) {
            $scope.categorys = categorys;
        });
        categoryDB.getById($routeParams.id).then(function (category) {
            $scope.category = category;
        });

        $scope.getAll = function () {
            categoryDB.all().then(function (categorys) {
                return categorys;
            });
        };

        $scope.save = function () {
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
            }else{
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
            categoryDB.deleteByID(id)
                .then(function () {
                    //Do somethin
                    $location.path('/category');
                });
        };
    });