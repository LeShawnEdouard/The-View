var router = require("express").Router();
var fetchRoutes = require("./fetch");
var noteRoutes = require("./notes");
var titleRoutes = require("./headlines");
var clearRoutes = require("./clear");

router.use("/fetch", fetchRoutes);
router.use("/notes", noteRoutes);
router.use("/headlines", titleRoutes);
router.use("/clear", clearRoutes);

module.exports = router;