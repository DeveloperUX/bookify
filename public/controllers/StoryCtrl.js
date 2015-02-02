angular
.module('Scribblit')
.controller('StoryController', ['$scope', 'StoryService', 'ScribbleService', 
                                function($scope, StoryService, ScribbleService) {

  var vm = this;
  var curStory = "54cf1945372e82e805448668";
  var curAuthor = "54cf194d372e82e805448669 "; // temp

  updateScribbles();
  
  function updateScribbles() {
    StoryService
    .getStory( curStory )
    .then(function (res) {
      vm.scribbles = res.data.scribbles;
      vm.title = res.data.title;
      vm.storyId = res.data._id;
    }); 
  }
  // NOTE: Why does this have to be $scope and not 'vm'?
  $scope.post = function() {
    ScribbleService
    .save(vm.userPost, curAuthor, curStory)
    .then(function(res) {
      updateScribbles();
    });
  };

}]);