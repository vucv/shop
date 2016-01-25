angular.module('MyApp.controllers.store', ['myApp.services.store'])

.controller('store', function($scope, $location, storeDB){
    $scope.stores =[];
    $scope.store;
    storeDB.all().then(function(stores){
        $scope.stores = stores;
    });

    $scope.save = function () {
        storeDB.create($scope.newStore.name, $scope.newStore.address, $scope.newStore.icon, $scope.newStore.tel)
            .then(function(){
            //Do something
            $location.path('/store');
        });
    };
    $scope.deleteStore = function (id) {
        storeDB.deleteByID(id)
            .then(function(){
            //Do somethin
            storeDB.all().then(function(stores){
                    $scope.stores = stores;
                });
        });
    };
    $scope.selectedItem = function (store) {
        $scope.selectStore = store;
    };
});