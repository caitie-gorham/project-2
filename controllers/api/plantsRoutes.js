const router = require('express').Router();
const { Plants, User, Join } = require('../../models');

// GET all plants

router.get('/', async (req, res) => {
    try {
      const plantData = await Plants.findAll();
      res.status(200).json(plantData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Get a single plant

router.get('./:id', async (req, res) => {
    try {
        const plantData = await Plants.findByPk(req.params.id, {
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

module.exports = plants;

