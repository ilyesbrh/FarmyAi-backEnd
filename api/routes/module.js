const express = require('express');
const router = express.Router();

// get all modules
router.get('/', (req, res) => {
    res.status(200).json({ message: 'hi 1234' });
});

// get module info
router.get('/:moduleId', (req, res) => {
    res.status(200).json({ message: 'hi 1234' });
});

// get user modules
router.get('/:userId', (req, res) => {
    res.status(200).json({ message: 'hi 1234' });
});

// get specific user module 
router.get('/:userId/:moduleId', (req, res) => {
    const id = req.params.id;
    if (id == '1') {
        res.status(200).json({ message: id });
    }
});

// post new module
router.post('/', (req, res) => {
    res.status(200).json({ message: 'hi 1234' });
});




module.exports = router;