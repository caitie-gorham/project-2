const router = require("express").Router();
const userRoutes = require("./userRoutes");
const joinRoutes = require("./joinRoutes");
const notesRoutes = require("./notesRoutes");
const plantsRoutes = require("./plantsRoutes");

router.use("/users", userRoutes);
router.use("/plants", plantsRoutes);
router.use("/join", joinRoutes);
router.use("/notes", notesRoutes);

module.exports = router;
