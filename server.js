// modules =================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var fs = require('fs');


// configuration ===========================================

// config files
var dbConfig = require('./app/config/db');

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

var db = mongoose.connect(dbConfig.url);
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
var ScribeSchema = db.Schema({
  name      : String,
  balance   : Number,
  scribbles : [{type: mongoose.Schema.ObjectId, ref: 'ScribbleSchema'}]
});

var ScribbleSchema = db.Schema({
  text      : String,
  story     : {type: mongoose.Schema.ObjectId, ref: 'StorySchema'},
  scribe    : {type: mongoose.Schema.ObjectId, ref: 'ScribeSchema'}
});

var StorySchema = db.Schema({
  scribbles : [{type: mongoose.Schema.ObjectId, ref: 'ScribbleSchema'}],
  title     : String,
  genre     : String
});

var Scribe = db.model('Scribe', ScribeSchema);
var Story = db.model('Story', StorySchema);
var Scribble = db.model('Scribble', ScribbleSchema);

var mike = new Scribe({
  name: "Skinny Mikey",
  balance: 7
});
var sadCat = new Story({
  title: "Sad Cat"
});
var scrib1 = new Scribble({
  text: "A cat fell into a rat hole",
  scribe: mike._id,
  story: sadCat._id
});
var scrib2 = new Scribble({
  text: "Then started to cry",
  scribe: mike._id,
  story: sadCat._id
});
var scrib3 = new Scribble({
  text: "because it stepped on a mouse",
  scribe: mike._id,
  story: sadCat._id
});

mike.scribbles = [scrib1, scrib2, scrib3];
sadCat.scribbles = [scrib1, scrib2, scrib3];

//mike.save();
//sadCat.save();
//scrib1.save();
//scrib2.save();
//scrib3.save();

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



// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app