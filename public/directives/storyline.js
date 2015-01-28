angular
  .module('Scribblit')
  .directive('storyline', storyline);

function storyline() {
  return {
    restrict: 'E',
    controller: 'StoryController',
    templateUrl: 'views/storyline.html',
    scope: {
      lines: '=scribbles'
    },
    // link is the Directive version of a constructor
    link: function (scope, element, attrs) {}
  };
}