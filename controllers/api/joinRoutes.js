const router = require('express').Router();
const { Join } = require('../../models');

// create a record

router.post('/', async (req,res) => {
    try {
        const joinData = await Join.create(req.body);
        res.status(200).json(joinData)
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete a record

router.delete('/:id', async (req,res) => {
    try {
        const joinData = await Join.destroy({
            where: { id: req.params.id }
        });
        if (!joinData) {
            res.status(404).json({ message: "No plant/user combo exists with that id" });
            return;
        }
    } catch (err) {
        res.status(500),json(err);
    }
});

module.exports = router;