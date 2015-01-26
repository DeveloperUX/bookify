angular.module('routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/storyboard.html',
			controller: 'StoryboardController'
		})

		.when('/nerds', {
			templateUrl: 'views/profile.html',
			controller: 'ProfileController'
		})

		.when('/geeks', {
			templateUrl: 'views/story.html',
			controller: 'StoryController'	
		});

	$locationProvider.html5Mode(true);

}]);