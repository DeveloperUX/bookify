// modules =================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var fs = require('fs');


// configuration ===========================================

// config files
var db = require('./app/config/db');

var port = process.env.PORT || 3000; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({
  extended: true
})); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + 'public')); // set the static files location /public/img will be /img for users

mongoose.connect(db.url);
// routes ==================================================
// var board = require('./controllers/board');
// board.controller(app); // pass our application into our routes

// dynamically include routes (Controller)
//fs.readdirSync('./controllers').forEach(function (file) {
//  if(file.substr(-3) == '.js') {
//      route = require('./controllers/' + file);
//      route.controller(app);
//  }
//});





// TODO move this code out of here

// DATABASE SCHEMA -- Set up our database schema
var ScribeSchema = mongoose.Schema({
  name: String,
  balance: Number,
  scribbles: [ScribbleSchema]
});

var ScribbleSchema = mongoose.Schema({
  text: String,
  scribe: {
    type: mongoose.Schema.ObjectId,
    ref: 'ScribeSchema'
  }
});

var StorySchema = mongoose.Schema({
  scribbles: [ScribbleSchema],
  title: String,
  genre: String
});

var Scribe = mongoose.model('Scribe', ScribeSchema);
var Story = mongoose.model('Story', StorySchema);
var Scribble = mongoose.model('Scribble', ScribbleSchema);

var mike = new Scribe({
  name: "Fat Mikey",
  balance: 7
});
var scrib1 = new Scribble({
  text: "A cat fell into a rat hole",
  scribe: mike.id
});
var scrib2 = new Scribble({
  text: "Then started to cry",
  scribe: mike.id
});
var scrib3 = new Scribble({
  text: "because it stepped on a mouse",
  scribe: mike.id
});
var sadCat = new Story({
  scribbles: [scrib1, scrib2, scrib3],
  genre: "sad"
});
mike.scribbles = [scrib1, scrib2, scrib3];
sadCat.scribbles = [scrib1, scrib2, scrib3];
Scribble.create({
  text: "A cat fell into a rat hole",
  scribe: mike.id
});

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
    genre : req.body.genre,
    title : req.body.title,
    scribbles : []
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






// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app