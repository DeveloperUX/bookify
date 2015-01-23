/****************************************************************\
 * This file will be responsible for loading all controllers, 
 * which we’ve already implemented. It will also define 
 * some more routes but without prefix, like a home page
 *
 * Since this is an index file we only need to use the folder
\****************************************************************/

var express = require('express');
var router = express.Router();


//// dynamically include all routes under the controller folder (Controllers)
//fs.readdirSync('./routes').forEach(function (file) {
//  if(file.substr(-3) == '.js') {
//    route = require('./routes/' + file);
//    route.controller(app);
//  }
//});

// -- OR --

// List out all the routes we'll need
router.use( '/api', require('./scribes') );
router.use( '/api', require('./stories') );
router.use( '/api', require('./scribbles') );

//router.get('/', function(req, res) {
//  console.log("Directory Name: " + __dirname);
//  res.sendfile('/public/index.html'); 
//})

router.get('/about', function(req, res) {
  res.send('Learn about us')
})

module.exports = router;