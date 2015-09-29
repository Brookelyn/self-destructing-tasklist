var todoApp = angular.module("todoApp", ["ui.router", "firebase"]);

// App set-up

todoApp.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$stateProvider.state('home', {
		url: '/',
		controller: 'TodoListController',
		templateUrl: '/templates/home.html'
	});
}]);



// Homepage controller

todoApp.controller('TodoListController', function($scope, $firebaseArray){

	var fbRef = new Firebase("https://popping-heat-6518.firebaseio.com/todos");

	$scope.todos = $firebaseArray(fbRef);

	$scope.addTodo = function() {
		$scope.todos.$add({text: $scope.todoText});
		$scope.todoText = "";
	};
});