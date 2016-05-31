(function(angular) {
var app = angular.module('pocApp.dashboard', ['ngRoute', 'pocApp.utility']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/dashboard', {
		controller: 'DashboardCtrl',
		templateUrl: 'views/dashboardView.html',
	});
	$routeProvider.when('/dashboard/:id', {
		controller: 'DashboardCtrl',
		templateUrl: 'views/dashboardView.html',
	});
}]);

app.value('_version', 'PriteshDashboard');

app.controller('DashboardCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'utility', '_version', function($scope,$rootScope, $routeParams, $location, utility, _version) {
	$scope.firstRunFlag = false;
	$scope.msg = $routeParams.id ? 'Dashboard Controller View - '+$routeParams.id :  "Dashboard Controller View";
	$scope.guid = utility.id() + _version;
	$scope.b = utility.id().substr(0,5);
	$scope.newId = function() {
		$scope.guid = $scope.b = Math.round(Math.random() * 100000000);
	}
	$scope.person = {
		fname: 'Default',
		lname: 'Value',
		fullname: function() {
			return this.fname + ' ' + this.lname;
		}
	};
	$scope.todos = [
		{title: 'Buy Movie Tickets', done: true},
		{title: 'Take jhon from school', done: false},
		{title: 'Call trinity for meet up', done: false},
	];
	$scope.remain = function() {
		var count = 0;
		angular.forEach($scope.todos, function(o) {
			count += o.done ? 1 : 0;
		});
		return count;
	}
	
	$scope.addTask = function(t) {
		$scope.todos.push({title: t.trim(), done:true});
		$scope.taskName = '';
	}
	
	$scope.clear = function() {
		var tasks = $scope.todos;
		$scope.todos = [];
		angular.forEach(tasks, function(t) {
			if(!t.done) {
				$scope.todos.push(t);
			}
		});
	}
	
	$scope.checkTasks = function() {
		var status = false;
		angular.forEach($scope.todos, function(t) {
			if(t.done) {
				status = true;
			}
		});
		return status;
	}
	
	$scope.$watch('selectAll', function(n,o) {
		var tasks = $scope.todos;
		$scope.todos = $scope.firstRunFlag ? [] : tasks;
		if(n) {
			angular.forEach(tasks, function(t) {
				t.done = true;
				$scope.todos.push(t);
			});
			return;
		}
		if(!n && $scope.firstRunFlag) {
			angular.forEach(tasks, function(t) {
				t.done = false;
				$scope.todos.push(t);
			});
			return;
		}
		$scope.firstRunFlag = true;
	});
	
}]);

})(angular);