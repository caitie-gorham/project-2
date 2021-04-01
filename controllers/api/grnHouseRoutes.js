const router = require('express').Router();
const { Greenhouse } = require('../../models');

// get route for all Greenhouse data

router.get('/', async (req, res) => {

    try {
      const greenhouseData = await Greenhouse.findAll();
          res.status(200).json(greenhouseData);
    } catch (err) {
      res.redirect("login");
    }
  });

// create a record

router.post('/', async (req,res) => {
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

router.delete('/:id', async (req,res) => {
    try {
        const greenhouseData = await Greenhouse.destroy({
            where: { id: req.params.id }
        });
        if (!greenhouseData) {
            res.status(404).json({ message: "No plant/user combo exists with that id" });
            return;
        }
    } catch (err) {
        res.status(500),json(err);
    }
});

module.exports = router;