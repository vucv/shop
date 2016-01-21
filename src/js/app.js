angular.module('MyApp', [
  'ngRoute',
  'mobile-angular-ui',
  'MyApp.controllers.Main',
  'MyApp.controllers.nhapDonHang'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
  $routeProvider.when('/nhapDonHang', {templateUrl:'nhapDonHang.html',  reloadOnSearch: false, controller:'nhapDonHang'});
});