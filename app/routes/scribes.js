var Scribe = require('../models/Scribe');

var express = require('express');
var router = express.Router();



// server routes ===========================================================
// handle things like api calls
// authentication routes


router.get('/scribes', function (req, res) {
  // use mongoose to get all scribes in the database
  Scribe.find(function (err, scribes) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err);
    res.json(scribes); // return all scribes in JSON format
  });
});


// create scribe and send back all scribes after creation
router.post('/scribes', function (req, res) {

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
router.delete('/scribes/:scribe_id', function (req, res) {
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


module.exports = router;