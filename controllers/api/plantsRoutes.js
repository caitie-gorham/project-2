const router = require('express').Router();
const { Plants, User, Greenhouse } = require('../../models');
const auth = require('../../utils/auth');

// GET all plants

router.get('/', async (req, res) => {

    try {
      const plantData = await Plants.findAll();
    //   const plants = plantData.map((plant) => plant.get({plain:true}));
      // logic to actually interate under each plant under this user and get({plain:true})
          res.status(200).json(plantData);
    } catch (err) {
      res.redirect("login");
    }
  });

// Get a single plant

router.get('/:id', async (req, res) => {
    try {
        const plantData = await Plants.findByPk(req.params.id, {
            // include: [{ model: User, through: Greenhouse, as: 'greenhouse_table'}]
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

