// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app with express
var mongoose = require('mongoose');                     // mongoose for mongodb
//var morgan = require('morgan');             // log requests to the console (express4)
//var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
//var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration =================
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
//app.use(morgan('dev'));                                         // log every request to the console
//app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
//app.use(bodyParser.json());                                     // parse application/json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//app.use(methodOverride());

// Connect to local database ==============
var db = mongoose.connect('mongodb://localhost:27017/snippets');

//attach lister to connected event
mongoose.connection.once('connected', function() {
  console.log("Connected to database")
});

// listen (start app with node server.js) ======================================
app.get('/', function (req, res) {
  res.send('Hello World!');
});


// TODO move this code out of here

// DATABASE SCHEMA -- Set up our database schema
var ScribeSchema = mongoose.Schema({
  name : String,
  balance : Number,
  scribbles : [ScribbleSchema]
});

var ScribbleSchema = mongoose.Schema({
  text : String,
  scribe : { type: mongoose.Schema.ObjectId, ref: 'ScribeSchema' }
});

var StorySchema = mongoose.Schema({
  scribbles : [ScribbleSchema],
  genre : String
});

var Scribe = mongoose.model('Scribe', ScribeSchema);
var Story = mongoose.model('Story', StorySchema);


// ROUTES -- API ==========================================================

app.get('/api/scribes', function(req, res) {
  // use mongoose to get all scribes in the database
  Scribe.find( function( err, scribes ) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err);
    res.json(scribes); // return all scribes in JSON format
  });
});


// create scribe and send back all scribes after creation
app.post('/api/scribes', function(req, res) {

  // create a scribe, information comes from AJAX request from Angular
  Scribe.create({
      text : req.body.text,
      done : false
  }, function(err, scribe) {
      if (err)
          res.send(err);

      // get and return all the scribes after you create another
      Scribe.find(function(err, scribes) {
          if (err)
              res.send(err)
          res.json(scribes);
      });
  });

});

// delete a scribe
app.delete('/api/scribes/:scribe_id', function(req, res) {
  Scribe.remove({
      _id : req.params.scribe_id
  }, function(err, scribe) {
      if (err)
          res.send(err);

      // get and return all the scribes after you create another
      Scribe.find(function(err, scribes) {
          if (err)
              res.send(err)
          res.json(scribes);
      });
  });
});

app.get('/api/stories', function(req, res) {
  // use mongoose to get all stories in the database
  Story.find( function( err, stories ) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err);
    res.json(stories); // return all stories in JSON format
  });
});


// create story and send back all stories after creation
app.post('/api/stories', function(req, res) {

  // create a story, information comes from AJAX request from Angular
  Story.create({
      text : req.body.text,
      done : false
  }, function(err, story) {
      if (err)
          res.send(err);

      // get and return all the stories after you create another
      Story.find(function(err, stories) {
          if (err)
              res.send(err)
          res.json(stories);
      });
  });

});

// delete a story
app.delete('/api/stories/:story_id', function(req, res) {
  Story.remove({
      _id : req.params.story_id
  }, function(err, story) {
      if (err)
          res.send(err);

      // get and return all the stories after you create another
      Story.find(function(err, stories) {
          if (err)
              res.send(err)
          res.json(stories);
      });
  });
});


app.listen(3000);
console.log("App listening on port 8080");
