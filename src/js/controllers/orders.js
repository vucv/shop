angular.module('MyApp.controllers.orders', ['myApp.services.orders', 'myApp.services.store',
    'myApp.services.category', 'myApp.services.product', 'ngRoute'])

    .controller('orders', function ($scope, $location, $routeParams, ordersDB, storeDB, categoryDB, productDB, SharedState) {
        $scope.orders = [];
        $scope.order;
        $scope.orderDetails = [];
        $scope.orderDetails.total = 0;
        $scope.orderDetail = {};
        $scope.stores = [];
        $scope.categorys = [];
        $scope.today = new Date().toLocaleDateString();

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

        if($routeParams.id){
            ordersDB.getById($routeParams.id).then(function (order) {
                $scope.order = order;
                $scope.order.date = new Date(order.date);
            });

            ordersDB.getOderDetailById($routeParams.id).then(function (orderDetails) {
                $scope.orderDetails = orderDetails;
                $scope.orderDetails.total = 0;
                for (var i = 0; i < $scope.orderDetails.length; i++) {
                    $scope.orderDetails.total += $scope.orderDetails[i].total*$scope.orderDetails[i].price;
                }
            });
        }

        $scope.getAll = function () {
            ordersDB.all().then(function (orders) {
                return orders;
            });
        };


        $scope.save = function () {
            if (!$scope.order || !$scope.order.storeName) {
                alert("Vui lòng nhập đầy đủ thông tin!!!");
                return;
            }
            if ($scope.order.date.getTime() > new Date().getTime()) {
                alert("Ngày nhập hóa đơn lớn hơn ngày hiện tại!!!");
                return;
            }
            if ($scope.orderDetails.length == 0) {
                alert("Vui lòng thêm sản phẩm vào hóa đơn mua hàng!!!");
                return;
            }
            storeDB.getIdByName($scope.order.storeName).then(function (storeID) {
                if (!$scope.order.ID) {
                    ordersDB.create(storeID, 0, $scope.order.date.getTime(), $scope.order.note)
                        .then(function (result) {
                            //Do something
                            if (result.rowsAffected != 0) {
                                //Insert order details
                                addDetail(result.insertId);
                            } else {
                                alert("Quá trình lưu bị lỗi !!!")
                            }
                        });
                } else {
                    ordersDB.updateByID($scope.order.ID, storeID, $scope.order.date.toLocaleDateString())
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

        function addDetail(orderID) {
            var count = $scope.orderDetails.length;
            for (var i = 0; i < $scope.orderDetails.length; i++) {
                var total = $scope.orderDetails[i].total;
                var price = $scope.orderDetails[i].price;
                productDB.getIdByName($scope.orderDetails[i].productName,
                    $scope.orderDetails[i].categoryID)
                    .then(function (productID) {
                        ordersDB.addDetail(orderID, productID, total, price)
                            .then(function (result) {
                                //Do something
                                count--;
                                if (count == 0) {
                                    $location.path('/orders');
                                }
                            });
                    });

            }
        };

        $scope.delete = function (id) {
            if($scope.orderDetails.length != 0){
                alert("Vui lòng xóa hết danh sách sản phẩm trong hóa đơn!!!");
                return;
            }
            var ok = confirm("Xóa hóa đơn ID: " + $scope.order.ID + " ?");
            if (ok) {
                ordersDB.deleteByID(id)
                    .then(function (result) {
                        //Do somethin
                        $location.path('/orders');
                    });
            }
        };

        $scope.addOrderDetail = function () {
            if (!$scope.orderDetail || !$scope.orderDetail.categoryID || !$scope.orderDetail.productName || !$scope.orderDetail.total || !$scope.orderDetail.price) {
                alert("Vui lòng nhập đầy đủ thông tin!!!");
                return;
            }
            if (!$scope.isAdd) {
                $scope.saveEditOrderDetail();
                return;
            }else if ($scope.order && $scope.order.ID) {
                var ID = $scope.order.ID;
                var total = $scope.orderDetail.total;
                var price = $scope.orderDetail.price;
                var productName = $scope.orderDetail.productName;
                var categoryID = $scope.orderDetail.categoryID;
                productDB.getIdByName(productName,categoryID)
                    .then(function (productID) {
                        ordersDB.addDetail(ID, productID, total, price)
                            .then(function (result) {
                                $scope.orderDetails.push($scope.orderDetail);
                                $scope.countTotal();
                                $scope.orderDetail = {};
                                SharedState.turnOff('modal1');
                            });
                    });
                return;
            }
            $scope.orderDetails.push($scope.orderDetail);
            $scope.orderDetails.total+=$scope.orderDetail.total * $scope.orderDetail.price;
            $scope.orderDetail = {};
            SharedState.turnOff('modal1');
        };



        $scope.deleteOrderDetail = function (index) {
            var orderDetail = $scope.orderDetails[index];
            var ok = confirm("Xóa sản phầm " + orderDetail.productName + " ?");
            if (ok) {
                if (!$scope.order || !$scope.order.ID) {
                    $scope.orderDetails.splice(index, 1);
                    $scope.countTotal();
                    return;
                }
                ordersDB.deleteOderDetailById(orderDetail.ID).then(function () {
                    //Do somethin
                    $scope.orderDetails.splice(index, 1);
                    $scope.countTotal();
                });
            }
        };

        $scope.addOrderButton = function () {
            $scope.isAdd = true;
            SharedState.turnOn('modal1');
        };
        $scope.editOrderDetail = function (index) {
            $scope.isAdd = false;
            $scope.orderDetail = $scope.orderDetails[index];
            $scope.oldOrderDetail = $scope.orderDetails[index];
            SharedState.turnOn('modal1');
        };

        $scope.saveEditOrderDetail = function () {
            if (!$scope.orderDetail || !$scope.orderDetail.categoryID || !$scope.orderDetail.productName || !$scope.orderDetail.total || !$scope.orderDetail.price) {
                alert("Vui lòng nhập đầy đủ thông tin!!!");
                return;
            }
            if (!$scope.order || !$scope.order.ID) {
                $scope.countTotal();
                $scope.orderDetail = {};
                SharedState.turnOff('modal1');
                return;
            }

            var ID = $scope.orderDetail.ID;
            var total = $scope.orderDetail.total;
            var price = $scope.orderDetail.price;
            productDB.getIdByName($scope.orderDetail.productName,
                $scope.orderDetail.categoryID)
                .then(function (productID) {
                    ordersDB.editDetail(ID, productID, total, price)
                        .then(function (result) {
                            $scope.countTotal();
                            $scope.orderDetail = {};
                            SharedState.turnOff('modal1');
                        });
                });
        };

        $scope.countTotal = function () {
            $scope.orderDetails.total = 0;
            for (var i = 0; i < $scope.orderDetails.length; i++) {
                $scope.orderDetails.total += $scope.orderDetails[i].total*$scope.orderDetails[i].price;
            }
        };
    });