angular.module('Scribblit')
  .factory('StoryService', ['$http',
    function ($http) {

      var vm = this;
      var StoryService = {};

      StoryService.getStory = function (id) {
        return $http
          .get('/api/stories/' + id)
          .success(function (response) {
            vm.storyInfo = response;
          });
      };

      StoryService.getStories = function () {
        return $http
          .get('/api/stories')
          .success(function (response) {
            vm.stories = response;
          });
      };

      return StoryService;

}]);