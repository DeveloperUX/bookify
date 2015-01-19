var mongoose = require('mongoose');
var Scribe = require('../models/Scribe');
var Scribble = require('../models/Scribble');
var Story = require('../models/Story');
var path = require('path');

module.exports.router = function(app) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  // frontend routes =========================================================
  // route to handle all angular requests
//  app.get('*', function(req, res) {
//      path.resolve('../../public/views/home.html');
//      res.render('MainCtrl');
//  });
  
  
  // ROUTES -- API ==========================================================

  app.get('/', function (req, res) {
    // use mongoose to get all scribes in the database
    Scribe.find(function (err, scribes) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err);
      res.json(scribes); // return all scribes in JSON format
    });
  });


  app.get('/api/scribes', function (req, res) {
    // use mongoose to get all scribes in the database
    Scribe.find(function (err, scribes) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err);
      res.json(scribes); // return all scribes in JSON format
    });
  });


  // create scribe and send back all scribes after creation
  app.post('/api/scribes', function (req, res) {

    // create a scribe, information comes from AJAX request from Angular
    Scribe.create({
      name: req.body.name,
      balance: 0
    }, function (err, scribe) {
      if (err)
        res.send(err);

      // get and return all the scribes after you create another
      Scribe.find(function (err, scribes) {
        if (err)
          res.send(err)
        res.json(scribes);
      });
    });

  });

  // delete a scribe
  app.delete('/api/scribes/:scribe_id', function (req, res) {
    Scribe.remove({
      _id: req.params.scribe_id
    }, function (err, scribe) {
      if (err)
        res.send(err);

      // get and return all the scribes after you create another
      Scribe.find(function (err, scribes) {
        if (err)
          res.send(err)
        res.json(scribes);
      });
    });
  });

  app.get('/api/stories', function (req, res) {
    // use mongoose to get all stories in the database
    Story.find(function (err, stories) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err);
      res.json(stories); // return all stories in JSON format
    });
  });


  // create story and send back all stories after creation
  app.post('/api/stories', function (req, res) {

    // create a story, information comes from AJAX request from Angular
    Story.create({
      title : req.body.title,
      scribbles : []
    }, function (err, story) {
      if (err)
        res.send(err);

      // get and return all the stories after you create another
      Story.findOne( {_id: story._id}, function(err, newStory) {
        if( err )
          res.send(err);
        res.json(newStory);

        // create the first scribble if it was written
        if( req.body.scribble ) {
          var scrib = new Scribble({text: scribble});
        }

      });
    });


  });


  // create story and send back all stories after creation
  app.post('/api/scribbles', function(req, res) {

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

  // delete a story
  app.delete('/api/stories/:story_id', function (req, res) {
    Story.remove({
      _id: req.params.story_id
    }, function (err, story) {
      if (err)
        res.send(err);

      // get and return all the stories after you create another
      Story.find(function (err, stories) {
        if (err)
          res.send(err)
        res.json(stories);
      });
    });
  });



};