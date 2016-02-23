angular.module('MyApp', [
    'ngRoute',
    'mobile-angular-ui',
    'mobile-angular-ui.core.sharedState',
    'mobile-angular-ui.gestures.drag',
    'MyApp.controllers.Main',
    'MyApp.controllers.nhapDonHang',
    'myApp.services',
    'myApp.services.syncDB',
    'myApp.services.store',
    'MyApp.controllers.store',
    'myApp.services.category',
    'MyApp.controllers.category',
    'myApp.services.orders',
    'MyApp.controllers.orders',
    'myApp.services.product',
    'MyApp.controllers.product',
    'MyApp.controllers.sale'
])
    .run(function (DB, syncDB, $rootScope) {
        DB.init();
        //sync data
        var timestamp = syncDB.syncTime();
        if (timestamp == 0) {
            syncDB.syncAll();
        } else {
            syncDB.syncWithTime(timestamp);
        }
        // Needed for the loading screen
        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function () {
            $rootScope.loading = true;
        });
    })
    .config(function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'sales/quick.html', reloadOnSearch: false, controller: 'sale'});
        $routeProvider.when('/nhapDonHang', {
            templateUrl: 'nhapDonHang.html',
            reloadOnSearch: false,
            controller: 'nhapDonHang'
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
    })
    .directive('pull-to-refresh', ['$drag', function ($drag) {
        return {
            controller: function (scope, element) {
                $drag.bind(element, {
                    transform: $drag.TRANSLATE_DOWN,
                    start: function (dragInfo, event) {
                        console.log('start ' +JSON.stringify(dragInfo));
                    },
                    end: function (dragInfo, event) {
                        console.log('end ' +JSON.stringify(dragInfo));
                    },
                    move: function (dragInfo, event) {
                        console.log('move ' +JSON.stringify(dragInfo));
                    },
                    cancel: function (dragInfo, event) {
                        console.log('cancel ' +JSON.stringify(dragInfo));
                    }
                });
            }
        }
    }]);

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    var link = window.location.href.split('/');
    var path = link.pop();
    if(path != ""){
        window.location.href = link.join('/');
    }else{
        navigator.app.exitApp();
    }
}