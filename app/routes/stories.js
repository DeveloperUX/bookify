var mongoose = require('mongoose');
var Scribe = require('../models/Scribe');
var Scribble = require('../models/Scribble');
var Story = require('../models/Story');

var express = require('express');
var router = express.Router();


router.get('/stories', function (req, res) {
  // use mongoose to get all stories in the database
  Story.find(function (err, stories) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err);
    console.log("Retrieved a Story from the database");
    res.json(stories); // return all stories in JSON format
  });
});


// create story and send back all stories after creation
router.post('/stories', function (req, res) {

  // create a story, information comes from AJAX request from Angular
  Story.create({
    title : req.body.title,
    scribbles : []
  }, function(err, story) {
    if(err)
      res.send(err);
    console.log("Added a new story to the database");
    // get and return this story after it's created
    Story.findOne( {_id: story._id}, function(err, newStory) {
      if( err )
        res.send(err);
      res.json(newStory);

    });
  });


});


// delete a story
router.delete('/stories/:story_id', function (req, res) {
  Story.remove({
    _id: req.params.story_id
  }, function (err, story) {
    if (err)
      res.send(err);
    console.log("Deleted a story from the database");
    // get and return all the stories after you create another
    Story.find(function (err, stories) {
      if (err)
        res.send(err)
      res.json(stories);
    });
  });
});

module.exports = router;