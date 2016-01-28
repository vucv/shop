angular.module('MyApp', [
    'ngRoute',
    'mobile-angular-ui',
    'MyApp.controllers.Main',
    'MyApp.controllers.nhapDonHang',
    'myApp.services',
    'myApp.services.store',
    'MyApp.controllers.store',
    'myApp.services.category',
    'MyApp.controllers.category',
    'myApp.services.orders',
    'MyApp.controllers.orders',
    'myApp.services.product',
    'MyApp.controllers.product',
    'MyApp.controllers.sale',
    'myApp.controllers'
])
    .run(function (DB) {
        DB.init();
    })
    .config(function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'home.html', reloadOnSearch: false, controller: 'sale'});
        $routeProvider.when('/nhapDonHang', {
            templateUrl: 'nhapDonHang.html',
            reloadOnSearch: false,
            controller: 'nhapDonHang'
        });
        $routeProvider.when('/testDB', {
            templateUrl: 'controller.html',
            reloadOnSearch: false,
            controller: 'DocumentCtrl'
        });
        $routeProvider.when('/store', {templateUrl: 'store/list.html', reloadOnSearch: false, controller: 'store'});
        $routeProvider.when('/store/add', {templateUrl: 'store/add.html', reloadOnSearch: false, controller: 'store'});
        $routeProvider.when('/store/view', {
            templateUrl: 'store/view.html',
            reloadOnSearch: false,
            controller: 'store'
        });
        $routeProvider.when('/category', {
            templateUrl: 'category/list.html',
            reloadOnSearch: false,
            controller: 'category'
        });
        $routeProvider.when('/category/add', {
            templateUrl: 'category/add.html',
            reloadOnSearch: false,
            controller: 'category'
        });
        $routeProvider.when('/category/view', {
            templateUrl: 'category/view.html',
            reloadOnSearch: false,
            controller: 'category'
        });
        $routeProvider.when('/orders', {
            templateUrl: 'orders/list.html',
            reloadOnSearch: false,
            controller: 'orders'
        });
        $routeProvider.when('/orders/add', {
            templateUrl: 'orders/add.html',
            reloadOnSearch: false,
            controller: 'orders'
        });
        $routeProvider.when('/orders/view', {
            templateUrl: 'orders/view.html',
            reloadOnSearch: false,
            controller: 'orders'
        });
        $routeProvider.when('/product', {
            templateUrl: 'product/list.html',
            reloadOnSearch: false,
            controller: 'product'
        });
        $routeProvider.when('/product/add', {
            templateUrl: 'product/add.html',
            reloadOnSearch: false,
            controller: 'product'
        });
        $routeProvider.when('/product/view', {
            templateUrl: 'product/view.html',
            reloadOnSearch: false,
            controller: 'product'
        });
        $routeProvider.when('/sales', {
            templateUrl: 'sales/list.html',
            reloadOnSearch: false,
            controller: 'sale'
        });
        $routeProvider.when('/sales/add', {
            templateUrl: 'sales/add.html',
            reloadOnSearch: false,
            controller: 'sale'
        });
        $routeProvider.when('/sales/view', {
            templateUrl: 'sales/view.html',
            reloadOnSearch: false,
            controller: 'sale'
        });
    });