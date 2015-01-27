
angular
.module('Scribblit')
.directive('storyline', storyline);

function storyline() {
  return {
    restrict: 'E',
    controller: 'StoryController',
    templateUrl: 'views/storyline.html'
  }
}
    
