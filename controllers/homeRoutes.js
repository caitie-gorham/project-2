const router = require("express").Router();
const { Plants, User, Greenhouse } = require("../models");
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
      include: [{ model: Plants, through: Greenhouse, as: "user_plants" }]
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
  const userId = req.session.user_id;
  try {
    console.log("in houesplantss route")
    // Find the logged in user based on the session ID
    const plantsData = await Plants.findAll({
      include: [{ model: User, as: "plant_users" }]
    });

    const plants = plantsData.map(plant => {
      const plantObject = plant.get({ plain: true });
      let hasPlant = false;
      if (plantObject.plant_users.length) {
        plantObject.plant_users.forEach(user => {
          console.log(user);
          if (user.id = userId)
            hasPlant = true;
        });
      }
      plantObject.ownedByCurrentUser = hasPlant;
      return plantObject;

    });
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
