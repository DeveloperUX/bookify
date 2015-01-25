//angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'NerdCtrl', 'NerdService', 'GeekCtrl', 'GeekService']);


function StoryCtrl($scope) {
  $scope.tagline = 'To the moon and back!';	
}

function StoryService() {}

angular.module('scribblit', [
  'ngRoute', 
  'StoryCtrl'
]);