var saburiKonnect = angular.module('saburiKonnect', ['ngRoute']);

saburiKonnect.config(function($routeProvider){
	return $routeProvider
	.when('/', {
		templateUrl: './partials/home.html',
		title: "Home",
		controller: "homeController"
	})
	.when('/newkid',{
		templateUrl: './partials/newKid.html'
	})
	.when('/kids',{
		templateUrl: './partials/kids.html'
	})
	.when('/static',{
		templateUrl: './partials/static.html'
	})
	.otherwise('/', {
		redirectTo: '/'
	})
});
