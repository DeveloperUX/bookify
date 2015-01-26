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
            loadScribbles( response );
          });
      };
      
      function loadScribbles( scribbleList ) {
        var scribbles = [];
        for( id in scribbleList ) {
          $http
            .get('/api/scribbles/' + id)
            .success( function(response) {
              scribbles.push( response );
            });
        }
      }

      StoryService.getStories = function () {
        return $http
          .get('/api/stories')
          .success(function (response) {
            vm.stories = response;
          });
      };

      return StoryService;

}]);