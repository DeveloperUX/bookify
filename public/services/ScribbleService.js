angular.module('Scribblit')
  .factory('ScribbleService', ['$http',
    function ($http) {

      var vm = this;
      var ScribbleService = {};

      ScribbleService.save = function(line, scribe, story) {
        var data = {
          text: line,
          scribe_id: scribe,
          story_id: story
        };
        return $http
          .post('/api/scribbles', data)
          .success(function (response) {
            vm.storyInfo = response;
          });
      };

      return ScribbleService;

}]);