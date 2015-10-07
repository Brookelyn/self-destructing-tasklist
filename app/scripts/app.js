var todoApp = angular.module("todoApp", ["ui.router", "firebase"]);

// App set-up

todoApp.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$stateProvider.state('home', {
		url: '/',
		controller: 'TodoListController',
		templateUrl: '/templates/home.html'
	});

	$stateProvider.state('completedtasks', {
		url: '/completedtasks',
		controller: 'CompletedTasksController',
		templateUrl: '/templates/completedtasks.html'
	});
}]);





// Homepage controller

todoApp.controller('TodoListController', function($scope, $firebaseArray, $interval){

	var fbRef = new Firebase("https://popping-heat-6518.firebaseio.com/todos");

	$scope.todos = $firebaseArray(fbRef);

    
	$scope.addTodo = function() {
		$scope.todos.$add({
			text: $scope.todoText, 
			dateCreated: Firebase.ServerValue.TIMESTAMP,
			completed: false
		});
		$scope.todoText = "";	
	};


	$scope.shouldExpire = function(todo) {		
		var currentDate = moment();
		var dateCreated = moment(todo.dateCreated);
		var diff = currentDate.diff(dateCreated, 'days');

		if (diff >= 7) {
			// hides expired task
			todo.completed = true;
			$scope.todos.$save(todo);
			return true;
		} else {
			// shows active task
			return false; 
		}


	};

	$scope.todoDone = function(todo){
		todo.completed = true;
		$scope.todos.$save(todo);
	}


	$scope.deleteTodo = function(todo) {
		$scope.todos.$remove(todo);
	};

});




// Completed list controller

todoApp.controller('CompletedTasksController', function($scope, $firebaseArray){

	var fbRef = new Firebase("https://popping-heat-6518.firebaseio.com/todos");

	$scope.todos = $firebaseArray(fbRef);

		$scope.expiredTasks = function(todo) {		
		var currentDate = moment();
		var dateCreated = moment(todo.dateCreated);
		var diff = currentDate.diff(dateCreated, 'days');

		if (diff >= 7) {
			// hides expired task
			return true;
		} else {
			// shows active task
			return false; 
		}
	};

});

