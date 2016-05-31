"use strict";

var app = angular.module('pocApp', ['ngRoute', 'pocApp.dashboard', 'pocApp.mobile']);

app.config(['$routeProvider', function($routeProvider) {
	// $routeProvider.when('/', {
		// controller: 'MainCtrl',
	// });
	$routeProvider.otherwise({redirectTo: '/dashboard'});
}]);

app.run(['$rootScope', '$location', function ($rootScope, $location) {
	$rootScope.redirect = function(path) {
		if($location.$$path && $location.$$path.indexOf(path) == -1) {
			console.log('Redirecting to '+path);
			$location.path('/' + path);
		}
	};
}]);


/* app.controller('MainCtrl', function() {
	console.log('Common Ctrl');
}); */

