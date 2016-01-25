angular.module('myApp.controllers', ['myApp.services'])
    .controller('DocumentCtrl', function($scope, Document, $location) {
        $scope.documents = [];
        $scope.document = null;
        $scope.newStore = null;
        $scope.selectStore = null;
        // Get all the documents
        Document.all().then(function(documents){
            $scope.documents = documents;
        });
        // Get one document, example with id = 2
        Document.getById(2).then(function(document) {
            $scope.document = document;
        });

        $scope.save = function () {
            Document.create($scope.newStore.name, $scope.newStore.address, $scope.newStore.phone)
                .then(function(){
                //Do something
                //$location.path('/controller');
            });
        };
        $scope.delete = function (id) {
            Document.deleteById(id)
                .then(function(){
                //Do somethin
                Document.all().then(function(documents){
                    $scope.documents = documents;
                });
            });
        };
        $scope.selectedItem = function (store) {
            $scope.selectStore = store;
        };

    });