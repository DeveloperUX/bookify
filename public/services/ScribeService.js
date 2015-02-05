angular.module('Scribblit')
  .factory('ScribeService', ['$http',
    function ($http) {

      var vm = this;
      var ScribeService = {};

      ScribeService.getScribe = function (id) {
        return $http
          .get('/api/scribes/' + id)
          .success(function (response) {
            vm.scribeInfo = response;
          });
      };

      ScribeService.getScribes = function () {
        return $http
          .get('/api/scribes')
          .success(function (response) {
            vm.scribes = response;
          });
      };

      return ScribeService;

}]);