const router = require('express').Router();
const { Plants, User, Join } = require('../../models');
const auth = require('../../utils/auth');

// GET all plants

router.get('/', async (req, res) => {

    try {
      const plantData = await Plants.findAll();
      const plants = plantData.map((plant) => plant.get({plain:true}));
      // logic to actually interate under each plant under this user and get({plain:true})
      // res.render("profile", {
      //   plants,
          res.status(200).json(plants);
    } catch (err) {
      res.redirect("login");
    }
  });

// router.get('/', async (req, res) => {
//   try {
//     const plantData = await Location.findAll();
//     res.status(200).json(plantData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// Get a single plant

router.get('/:id', auth, async (req, res) => {
    try {
        const plantData = await Plants.findByPk(req.session.plant_id, {
            include: [{ model: User, through: Join, as: 'join_table'}]
        });

        if(!plantData) {
            res.status(404).json({ message: 'No plant found with this id!' });
            return;
        }
        res.status(200).json(plantData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;

