  // saburiKonnect.factory('NewOrganisationFactory',function($http){
   //  	var factory = {};
   //  	factory.addOrganisation = function(info,callback){
   //      	$http.post('/add_organisation', info).success(function(output){
   //          	callback(output);
   //      	});
   //     };
   //  	return factory;
   //  });

    saburiKonnect.controller('newKidController', function($scope,$location,$routeParams, NewKidFactory){
    	$scope.register = function()
    	{
    		console.log("in controller");
    		NewOrganisationFactory.addOrganisation($scope.register);
    	};

     });
