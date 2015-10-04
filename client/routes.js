var saburiKonnect = angular.module('saburiKonnect', ['ngRoute']);

saburiKonnect.config(function($routeProvider){
	return $routeProvider
	.when('/', {
		templateUrl: './partials/home.html',
		title: "Home",
		controller: "homeController"
	})
	.when('/addKid',{
		templateUrl: './partials/newKid.html'
	})
	.otherwise('/', {
		redirectTo: '/'
	})
});
