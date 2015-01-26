angular.module('Scribblit')
  .factory('StoryService', ['$http', function($http) {

    function getStory(id) {
      $http
        .get('/stories/:id')
        .success(function (response) {
          vm.users = response;
        });
    }

}]);