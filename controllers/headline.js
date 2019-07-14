// Controller for our headlines
// ============================
var db = require("../models");

module.exports = {
  // Searching for all titles by date to display for the user
  findAll: function(req, res) {
    db.Title
      .find(req.query)
      .sort({ date: -1 })
      .then(function(dbTitle) {
        res.json(dbTitle);
      });
  },
  // Will delete the title
  delete: function(req, res) {
    db.Title.remove({ _id: req.params.id }).then(function(dbTitle) {
      res.json(dbTitle);
    });
  },
  // Modify/update the specified title
  update: function(req, res) {
    db.Title.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(function(dbTitle) {
      res.json(dbTitle);
    });
  }
};