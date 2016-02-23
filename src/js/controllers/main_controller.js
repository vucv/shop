angular.module('MyApp.controllers.Main', [])

.controller('MainController', function($rootScope){
        // Needed for the loading screen
        $rootScope.$on('$routeChangeStart', function(){
            $rootScope.loading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function(){
            $rootScope.loading = false;
        });
});