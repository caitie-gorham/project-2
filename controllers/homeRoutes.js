const router = require("express").Router();
const { Plants, User, Join } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    res.render("homepage", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{model: Plants, through: Join, as: "user_plants"}]
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get("/houseplants", withAuth, async (req, res) => {
  try {
    console.log("in houesplantss route")
    // Find the logged in user based on the session ID
    const plantsData = await Plants.findAll();

    const plants = plantsData.map(plant => plant.get({ plain: true }));
    console.log(plants);
    res.render("houseplants", {
      plants,
      logged_in: true,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});


router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("signup");
});

module.exports = router;
