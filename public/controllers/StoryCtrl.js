angular.module('Scribblit')
  .controller('StoryController', function(StoryService) {

    var vm = this;
  
	StoryService
      .getStory( "54bc8f073fea8d7306b2f0c3" )
      .then( function(res) {
        vm.stories = res;
    });

});