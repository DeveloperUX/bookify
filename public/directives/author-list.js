angular
  .module('Scribblit')
  .directive('authorList', ['ScribeService', function(ScribeService) {

  return {
    restrict: 'E',
    templateUrl: 'views/author-list.html',
//     scope: {
//       authors: '='
//     },
    // link is the Directive version of a constructor
    link: function (scope, element, attrs) {
      ScribeService.getScribes().then( function(res) {
        scope.authors = res.data;
      });
    }
  };

  }]);