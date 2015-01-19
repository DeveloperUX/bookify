// grab the mongoose module
var mongoose = require('mongoose');

// module.exports allows us to pass this to other files when it is called

// DATABASE SCHEMA -- Set up our database schema
var ScribeSchema = mongoose.Schema({
  name      : String,
  balance   : Number,
  scribbles : [{type: mongoose.Schema.ObjectId, ref: 'ScribbleSchema'}]
});


module.exports = mongoose.model('Scribe', ScribeSchema);