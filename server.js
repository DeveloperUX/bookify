// modules =================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan   = require('morgan');
var database = require('./app/config/db');

// configuration ===========================================
var port = process.env.PORT || 3000; // set our port
// get all data/stuff of the body (POST) parameters
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 
app.use(express.static(__dirname + '/bower_components'));

mongoose.connect(database.url); // connect to our database, the url is in another config file

// dynamically load all routes under the routes folder
// the route files will be called in the index.js file under /routes
app.use( require('./app/routes') );

// start app ===============================================
app.listen(port);

console.log('Magic happens on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app
