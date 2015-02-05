var Scribe = require('../models/Scribe');
var Scribble = require('../models/Scribble');
var Story = require('../models/Story');



var express = require('express');
var router = express.Router();

// TODO Only for testing
router.get('/scribbles', function (req, res) {
  // use mongoose to get all scribes in the database
  Scribble.find(function (err, scribbles) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err);
    res.json(scribbles); // return all scribes in JSON format
  });
});

// create story and send back all stories after creation
router.post('/scribbles', function(req, res) {

//  // Get the author and Story
//  var story = Story.findById( req.body.story_id );
//  var author = Scribe.findById( req.body.scribe_id );
  
  var scrib = new Scribble({text: req.body.text});
  // Find the associated Story to which this scribble is being added and modify it
  Story.findById( req.body.story_id.trim(), function(err, linkedStory) {
    linkedStory.scribbles.push( scrib );
    linkedStory.save();
  });
  // Add this also to the author of the scribble
  Scribe.findById( req.body.scribe_id.trim(), function(err, linkedScribe) {
    linkedScribe.scribbles.push( scrib );
    linkedScribe.save();
  });
  
  scrib.save();
  
  res.json(scrib); // return all stories in JSON format
  
});


/**
 * Find a specific Scribble
 */
router.get('/scribbles/:id', function (req, res) {
  // use mongoose to get all stories in the database
  Scribble.findById(req.params.id, function(err, scribble) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if(err)
      res.send(err);
    console.log("Retrieved a Scribble from the database");
    res.json(scribble); // return all stories in JSON format
  });
});





module.exports = router;