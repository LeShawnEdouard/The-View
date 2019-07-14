var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var titleSchema = new Schema({
  // 'title' is required and of type String
  title: {
    type: String,
    required: true,
    unique: { index: { unique: true } }
  },
  // 'link' is required and of type String
  summary: { 
    type: String,
    required: true
  },

  url: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },
  saved: {
    type: Boolean,
    default: false
  }
});

// This creates our model from the above schema, using mongoose's model method
var Title = mongoose.model("Title", titleSchema);

// Export the Article model
module.exports = Title;