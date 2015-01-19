// grab the mongoose module
var mongoose = require('mongoose');

var StorySchema = mongoose.Schema({
  scribbles : [{type: mongoose.Schema.ObjectId, ref: 'ScribbleSchema'}],
  title     : String,
  genre     : String
});

module.exports = mongoose.model('Story', StorySchema);