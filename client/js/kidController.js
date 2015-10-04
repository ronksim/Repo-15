

    saburiKonnect.controller('kidController', function($scope,$routeParams){

        $scope.kid = JSON.parse($routeParams.object)

        console.log($scope.kid)

    });



