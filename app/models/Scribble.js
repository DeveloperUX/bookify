// grab the mongoose module
var mongoose = require('mongoose');

var ScribbleSchema = mongoose.Schema({
  text      : String
});

module.exports = mongoose.model('Scribble', ScribbleSchema);