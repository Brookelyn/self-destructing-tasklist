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

todoApp.controller('TodoListController', function($scope, $firebaseArray, $interval){

	var fbRef = new Firebase("https://popping-heat-6518.firebaseio.com/todos");

	$scope.todos = $firebaseArray(fbRef);  	
    
	$scope.addTodo = function() {

		$scope.todos.$add({
			text: $scope.todoText, 
			dateCreated: Firebase.ServerValue.TIMESTAMP
		});
		$scope.todoText = "";	
	};

	$scope.shouldExpire = function(todo) {
		var currentDate = moment();
		var dateCreated = moment(todo.dateCreated);
		var diff = currentDate.diff(dateCreated, 'days');		
		if (diff >= 7) {
			return true;
		} else {
			return false;
		}
	};

	$scope.deleteTodo = function(todo) {
		$scope.todos.$remove(todo);
	};

	
 
});

