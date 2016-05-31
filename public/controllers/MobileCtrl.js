(function(angular) {

var app = angular.module('pocApp.mobile', ['ngRoute', 'pocApp.utility']);

app.config(['$routeProvider', 'pkProvider', function($routeProvider, pkProvider) {
	console.log("Config block");
	$routeProvider.when('/mobile', {
		controller: 'MobileCtrl',
		templateUrl: 'views/mobile.html'
	}).when('/testA', {
		controller: 'ctrlA',
		template: '<h1 mydir>test ctrlA {{mymodel}}</h1>'
	});
	
	pkProvider.setX(466);
}]);

app.run(function() {
	console.log("run block");
});

app.provider("pk", function() {
	console.log("provider block");
	var x = 50;
	
	this.setX = function(y) {
		x = y;
	}
	this.$get = function() {
		return new function() {
			console.log("provider inner block");
			this.what = function() {
				return typeof x;
			}
			this.change = function(y) {
				x = x + (y || 1);
				return x;
			}
			this.inc = function() {
				return ++x;
			}
		}
	}
});

app.factory("fac", function() {
	console.log("factory block");
	var t = new Date();
	return {
		day : function() {
			return t.getFullYear();
		}
	}
});

app.service("test", function() {
	console.log("service block");
	this.msg = "test service";
	this.hello = function() {
		return "hello world";
	}
});

app.directive("mydir", function() {
	console.log("directive block");
	return {
		restrict: "A",
		//scope: true,
		link: function(scope,elem,attr) {
			console.log(elem);
			elem.on("click", function(e) {
				alert(this.innerText);
			});
		}
	}
})

app.controller('MobileCtrl', ['$scope', '$rootScope', '$location', 'utility', 'test', 'pk', 'fac', function($scope,$rootScope, $location, utility, test, pk, fac) {
	console.log("controller block");
	$scope.msg = "Mobile Controller View";
	$scope.guid = utility.id();
	$scope.ids = [];
	$scope.newId = function() {
		$scope.guid = utility.id();
		$scope.ids.push($scope.guid);
	}
	$scope.remove = function(i) {
		$scope.ids.splice(i,1);
	}
	test.newmsg = "set on controller";
	test.msg="changed";
	//console.log(test);
	$scope.pk = pk;
	$scope.fac = fac;
	$scope.test = test;
}]);

app.controller("ctrlA", function($scope,test) {
	test.pritesh = "pritesh jha";
	$scope.mymodel = test.msg;
	//console.log(test);
})

})(angular);