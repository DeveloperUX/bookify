angular.module('Scribblit')
  .controller('StoryboardController', function(StoryboardService) {

    var vm = this;
  
	StoryboardService
      .getStories()
      .then( function(res) {
        vm.stories = res;
    });

});