// modules =================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


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

// dynamically load all routes under the routes folder
// the route files will be called in the index.js file under /routes
app.use( require('./app/routes') );

// TODO move
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); 
  // load the single view file (angular will handle the page changes on the front-end)
});

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app