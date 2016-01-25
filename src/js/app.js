angular.module('MyApp', [
  'ngRoute',
  'mobile-angular-ui',
  'MyApp.controllers.Main',
  'MyApp.controllers.nhapDonHang',
  'myApp.services',
  'myApp.services.store',
  'MyApp.controllers.store',
  'myApp.controllers'
])
.run(function(DB) {
        DB.init();
    })
.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
  $routeProvider.when('/nhapDonHang', {templateUrl:'nhapDonHang.html',  reloadOnSearch: false, controller:'nhapDonHang'});
  $routeProvider.when('/testDB', {templateUrl:'controller.html',  reloadOnSearch: false, controller:'DocumentCtrl'});
  $routeProvider.when('/store', {templateUrl:'stores.html',  reloadOnSearch: false, controller:'store'});
  $routeProvider.when('/store/add', {templateUrl:'addStore.html',  reloadOnSearch: false, controller:'store'});
});