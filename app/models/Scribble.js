// grab the mongoose module
var mongoose = require('mongoose');

var ScribbleSchema = mongoose.Schema({
  text      : String,
  story     : {type: mongoose.Schema.ObjectId, ref: 'Story'},
  scribe    : {type: mongoose.Schema.ObjectId, ref: 'Scribe'}
});

module.exports = mongoose.model('Scribble', ScribbleSchema);