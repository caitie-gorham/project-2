const router = require("express").Router();
const userRoutes = require("./userRoutes");
const grnHouseRoutes = require("./grnHouseRoutes");
const notesRoutes = require("./notesRoutes");
const plantsRoutes = require("./plantsRoutes");

router.use("/users", userRoutes);
router.use("/plants", plantsRoutes);
router.use("/greenhouse", grnHouseRoutes);
router.use("/notes", notesRoutes);

module.exports = router;
