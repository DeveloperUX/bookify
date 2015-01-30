angular
.module('Scribblit')
.controller('StoryController', ['$scope', 'StoryService', 'ScribbleService', 
                                function($scope, StoryService, ScribbleService) {

  var vm = this;
  var curStory = "54bc8f073fea8d7306b2f0c3";
  var curAuthor = "54bc8f073fea8d7306b2f0c2 "; // temp

  updateScribbles();
  
  function updateScribbles() {
    StoryService
    .getStory( curStory )
    .then(function (res) {
      vm.scribbles = res.data.scribbles;
    }); 
  }
  // NOTE: Why does this have to be $scope and not 'vm'?
  $scope.post = function() {
    ScribbleService
    .save($scope.userPost, curAuthor, curStory)
    .then(function(res) {
      updateScribbles();
    });
  };

}]);