var db = require("../models");

module.exports = {
  clearDB: function(req, res) {
    db.Title.remove({})
      .then(function() {
        return db.Note.remove({});
      })
      .then(function() {
        res.json({ ok: true });
      })
  }
};