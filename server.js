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
 var board = require('./app/controllers/board');
 board.router(app); // pass our application into our routes

// dynamically include routes (Controller)
//fs.readdirSync('./controllers').forEach(function (file) {
//  if(file.substr(-3) == '.js') {
//      route = require('./controllers/' + file);
//      route.controller(app);
//  }
//});





// TODO move this code out of here


//var mike = new Scribe({
//  name: "Skinny Mikey",
//  balance: 7
//});
//var sadCat = new Story({
//  title: "Sad Cat"
//});
//var scrib1 = new Scribble({
//  text: "A cat fell into a rat hole",
//  scribe: mike._id,
//  story: sadCat._id
//});
//var scrib2 = new Scribble({
//  text: "Then started to cry",
//  scribe: mike._id,
//  story: sadCat._id
//});
//var scrib3 = new Scribble({
//  text: "because it stepped on a mouse",
//  scribe: mike._id,
//  story: sadCat._id
//});
//
//mike.scribbles = [scrib1, scrib2, scrib3];
//sadCat.scribbles = [scrib1, scrib2, scrib3];

//mike.save();
//sadCat.save();
//scrib1.save();
//scrib2.save();
//scrib3.save();


// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); // shoutout to the user
exports = module.exports = app; // expose app