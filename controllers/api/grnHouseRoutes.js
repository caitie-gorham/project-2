const router = require('express').Router();
// const { where } = require('sequelize/types');
const { Greenhouse, Plants, User } = require('../../models');


// get route for all Greenhouse data

router.get('/', async (req, res) => {

    try {
        const greenhouseData = await Greenhouse.findAll({
            include: [{ model: Plants }],
          
            where: {
                user_id: req.session.user_id,
            },

        });
        const greenhousePlants = greenhouseData.map(plant => plant.get({plain: true})); //edit
        console.log(greenhousePlants ); //edit
        res.status(200).json(greenhousePlants); //edit
    } catch (err) {
        res.redirect("login");
    }
});

router.get('/:user_id', async (req, res) => {
    try {
        const userPlants = await Greenhouse.findByPk(req.params.user_id, {
            include: [{ model: Plants, through: Greenhouse, as: 'user_plants' }]

        })
        if (userPlants) {
            res.status(404).json({ message: 'What plants??' });
            return;
        }
        res.status(200).json(userPlants);
    } catch (err) {
        res.status(500).json(err);
    }
});
// create a record

router.post('/', async (req, res) => {
    console.log("we hit the route!");
    console.log(req.body);
    console.log(req.session.user_id);

    const newPlant = {
        plant_id: req.body.plant_id,
        user_id: req.session.user_id
    }
    console.log(newPlant);
    try {
        const greenhouseData = await Greenhouse.create(newPlant);
        res.status(200).json(greenhouseData)
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete a record

router.delete('/:id', async (req, res) => {
    try {
        const greenhouseData = await Greenhouse.destroy({
            where: { id: req.params.id }
        });
        if (!greenhouseData) {
            res.status(404).json({ message: "No plant/user combo exists with that id" });
            return;
        }
    } catch (err) {
        res.status(500), json(err);
    }
});

module.exports = router;