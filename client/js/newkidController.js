  
   saburiKonnect.factory('NewKidFactory',function($http){
    	var factory = {};
    	factory.addKid = function(info,callback){
        	$http.post('/add_kid', info).success(function(output){
            	callback(output);
        	});   
        };
    	factory.getOrganisations = function(callback){
        	$http.get('/get_organisations').success(function(output){
            	callback(output);
        	});        
    	};
        factory.getKids = function(callback){
            $http.get('/get_kids').success(function(output){
                callback(output);
            });
        };
    	return factory;
    });

    saburiKonnect.controller('newKidController', function($scope,$location,$routeParams, NewKidFactory){
    	// console.log('hi');
        $scope.addKid = function()
    	{
    		console.log("in controller");
    		NewKidFactory.addKid($scope.newkid);
    	};

    	NewKidFactory.getOrganisations(function(data)
    	{
       		$scope.organisations = data;
    	})

        NewKidFactory.getKids(function(data){
            $scope.kids = data;
        })
    });



