angular.module('MyApp.controllers.sale', ['myApp.services.sale','myApp.services.store',
    'myApp.services.category','myApp.services.product', 'ngRoute'])

    .controller('sale', function ($scope, $location, $routeParams, saleDB, storeDB, categoryDB, productDB) {
        $scope.sales = [];
        $scope.salesToday = [];
        $scope.sale;
        $scope.categorys=[];
        $scope.today= new Date().toLocaleDateString();

        saleDB.all().then(function (sales) {
            $scope.sales = sales;
        });
        saleDB.allToday().then(function (sales) {
            $scope.salesToday = sales;
        });
        //Get list shop store
        productDB.all().then(function (products) {
            $scope.products = products;
        });

        categoryDB.all().then(function (categorys) {
            $scope.categorys = categorys;
        });

        saleDB.getById($routeParams.id).then(function (sale) {
            $scope.sale = sale;
            $scope.sale.date = new Date(sale.date);
            $scope.sale.dateTitle = new Date(sale.date).toLocaleDateString();
        });

        $scope.checkProduct = function (name) {
            for (var i = 0; i < $scope.products.length; i++) {
                if(name == $scope.products[i].name){
                    return true;
                }
            }
            return false;
        }

        $scope.save = function () {
            if (!$scope.sale || !$scope.sale.productName|| !$scope.sale.price) {
                alert("Vui lòng nhập đầy đủ thông tin!!!");
                return;
            }
            if ($scope.sale.date.getTime() > new Date().getTime()) {
                alert("Ngày nhập hóa đơn lớn hơn ngày hiện tại!!!");
                return;
            }


            if(!$scope.checkProduct($scope.sale.productName)){
                alert("Sản phẩm không tồn tại!!!");
                return;
            }
            if (!$scope.sale.ID) {
                productDB.getIdByName($scope.sale.productName,null)
                    .then(function (productID) {
                        saleDB.create($scope.sale.date.getTime(), productID, $scope.sale.price)
                            .then(function (result) {
                                //Do something
                                if (result.rowsAffected != 0) {
                                    $location.path('/sales');
                                } else {
                                    alert("Quá trình lưu bị lỗi !!!")
                                }
                            });
                    });
            }else{
                productDB.getIdByName($scope.sale.productName,null)
                    .then(function (productID) {
                        saleDB.updateByID($scope.sale.ID, $scope.sale.date.getTime(), productID, $scope.sale.price)
                            .then(function (result) {
                                //Do something
                                if (result.rowsAffected != 0) {
                                    $location.path('/sales');
                                } else {
                                    alert("Quá trình lưu bị lỗi !!!")
                                }
                            });
                    });
            }
        };

        $scope.delete = function (id) {
            var ok = confirm("Xóa giao dịch " + $scope.sale.ID + " ?");
            if (ok) {
                saleDB.deleteByID(id)
                    .then(function () {
                        //Do somethin
                        $location.path('/sales');
                    });
            }
        };
    });