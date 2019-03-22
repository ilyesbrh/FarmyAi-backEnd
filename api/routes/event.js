const express = require('express');
const router = express.Router();
const getevents = require('../../database').getEvents;


//get all events
router.get('/', (req, res, next) => {

    userId = req.query.id;
    offset = req.query.offset;
    limit = req.query.limit;

    console.log(req.params);

    getevents(userId, offset, limit)
        .then((value) => {

            res.status(200).json(value);

        })
        .catch((err) => {
            console.log(err.message);
            
        });
});

//get user events
router.get('/:id', (req, res) => {
    res.status(200).json({ message: 'hi 1234' });
});

//get user notification if it occurs
router.get('/notification/:id', (req, res) => {

    const id = req.params.id;

    res.status(200).json({ message: id });

});

//post notification from module
router.post('/notification', (req, res) => {


});

module.exports = router;
