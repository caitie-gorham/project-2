const router = require('express').Router();
const { Notes, Plants, User } = require('../../models');

// get all notes

router.get('./', async (req, res) => {
    try {
        const noteData = await Notes.findAll({
            include: [{ model: User}, { model: Plants }],
        });
        res.status(200).json(noteData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get one note

router.get('./:id', async (req, res) => {
    try {
        const noteData = await Notes.findByPk(req.params.id, {
            include: [{ model: User}, { model: Plants }],
        });
        if (!noteData) {
            res.status(404).json({ message: 'No note found with that id!' });
            return;
        }
        res.status(200).json(noteData);
    } catch (err) {
        res.status(500).json(err);
    }
})

// create a note

router.post('/', async (req, res) => {
    try {
        const noteData = await Notes.create(req.body);
        res.status(200).json(noteData);
    } catch (err) {
        res.status(400).json(err);
    }
})

// update a note

router.put(':/id', async (req, res) => {
    try {
        const noteData = await Notes.update (
            {
                note: req.body.note
            }, 
            {
                where: {
                    id: req.params.id
                }
            }
        )
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete a note

router.delete(':/id', async(req, res) => {
    try {
        const noteData = await Notes.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!noteData) {
            res.status(404).json({ message: 'No note found with this id!' });
            return;
        }
        res.status(200).json(noteData)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;