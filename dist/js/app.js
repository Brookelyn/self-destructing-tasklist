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




// Navigation controller

todoApp.controller('AppCtrl', function($rootScope, $state) {
	$rootScope.$on('$stateChangeSuccess',
  	function(event, toState, toParams, fromState, fromParams) {
  		$rootScope.$state = toState;
  	}
	)
});




// Homepage controller

todoApp.controller('TodoListController', function($scope, $firebaseArray, $interval){

	

	var fbRef = new Firebase("https://popping-heat-6518.firebaseio.com/todos");

	$scope.todos = $firebaseArray(fbRef);

	$scope.dropdownText = "Priority";


	$scope.priorityChoices = [
		{name: 'Urgent', id: 0}, 
		{name: 'High', id: 1}, 
		{name: 'Low', id: 2}
	];


	$scope.setChoice = function(id) {
		$scope.todoPriority = $scope.priorityChoices[id];
		if (id === 0) {
			$scope.dropdownText = "Urgent";
			console.log(id);
		}
		if (id === 1) {
			$scope.dropdownText = "High";
		}
		if (id === 2) {
			$scope.dropdownText = "Low";
		}
	}
    

	$scope.addTodo = function() {
		$scope.todos.$add({
			text: $scope.todoText, 
			dateCreated: Firebase.ServerValue.TIMESTAMP,
			completed: false,
			priority: $scope.todoPriority.id
		});
		$scope.todoText = "";	
		$scope.todoPriority = "";
		$scope.dropdownText = "Priority";

	};

	$scope.setIndicator = function(todo) {
		if (todo.priority == 0) {
			return 'priority-urgent';
		}
		if (todo.priority == 1) {
			return 'priority-high';
		}
		if (todo.priority == 2) {
			return 'priority-low';
		}
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

});

