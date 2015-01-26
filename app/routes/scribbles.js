var Scribe = require('../models/Scribe');
var Scribble = require('../models/Scribble');
var Story = require('../models/Story');

var express = require('express');
var router = express.Router();


// create story and send back all stories after creation
router.post('/scribbles', function(req, res) {

  // create a new scribble and tie it to a story and author
  Scribble.create({
    text : req.body.text,
    scribe : req.body.scribe_id,
    story : req.body.story_id
  }, function (err, scribble) {
    if(err)
      res.send(err);
    res.send(scribble);

    // Find the associated Story to which this scribble is being added and modify it
    Story.findOne( {_id: scribble.story}, function(err, linkedStory) {
      linkedStory.scribbles.push( scribble );
      linkedStory.save();
    });
    // Add this also to the author of the scribble
    Scribe.findOne( {_id: scribble.scribe}, function(err, linkedScribe) {
      linkedScribe.scribbles.push( scribble );
      linkedScribe.save();
    });
  });
  
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