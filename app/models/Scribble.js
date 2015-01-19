// grab the mongoose module
var mongoose = require('mongoose');

var ScribbleSchema = mongoose.Schema({
  text      : String,
  story     : {type: mongoose.Schema.ObjectId, ref: 'StorySchema'},
  scribe    : {type: mongoose.Schema.ObjectId, ref: 'ScribeSchema'}
});

module.exports = mongoose.model('Scribble', ScribbleSchema);