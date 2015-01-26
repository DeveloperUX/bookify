angular.module('Scribblit')
  .factory('StoryboardService', ['$http', function($http) {

    function getStories() {

      $http
        .get('/stories')
        .success(function (response) {
          vm.users = response;
        });
    }

}]);