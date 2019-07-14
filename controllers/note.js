// Controller for our notes
// ========================
var db = require("../models");

module.exports = {
  // Finding a note
  find: function(req, res) {
    db.Note.find({ _titleId: req.params.id }).then(function(dbNote) {
      res.json(dbNote);
    });
  },
  // Creating a new note
  create: function(req, res) {
    db.Note.create(req.body).then(function(dbNote) {
      res.json(dbNote);
    });
  },
  // Deleting a note with the associated id
  delete: function(req, res) {
    db.Note.remove({ _id: req.params.id }).then(function(dbNote) {
      res.json(dbNote);
    });
  }
};