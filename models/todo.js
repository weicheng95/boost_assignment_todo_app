// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema
// define the schema for our user model


var TodoSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
  },
  items: [{
    title: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false
    },
  }],
});

// create the model for tickets
module.exports = mongoose.model("Todos", TodoSchema)