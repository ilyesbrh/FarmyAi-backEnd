const express = require('express');
const router = express.Router();
const getevents = require('../../database').getEvents;
const MarkSeen = require('../../database').markAsSeen;
const liveNotification = require('../../database').liveNotification;
const getAnimalsStats = require('../../database').getAnimalsStats;
const postEvent = require('../../database').PostEvent;
const multer = require('multer');
const upload = multer()

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

//get animals stats
router.get('/animals/:id', (req, res, next) => {

    userId = req.params.id;
    
    console.log(req.params);

    getAnimalsStats(userId)
        .then((value) => {

            res.status(200).json(value);

        })
        .catch((err) => {
            console.log(err.message);

        });
});

//get user events
router.patch('/markSeen/:id', (req, res) => {

    MarkSeen(req.params.id).then((_) => {

        res.status(200).json({});
    });
});

//get user notification if it occurs
router.get('/notification/:id', (req, res) => {

    const id = req.params.id;

    liveNotification(req.params.id).then((notification) => {

        res.status(200).json(notification);
    })
});

//post notification from module
router.post('/notification', upload.single('image'), (req, res, next) => {

    console.log(req.file);
    let imageName =Date.now().toString()+req.body.userId+ "." + req.file.mimetype.split("/")[1];
    let imageUrl = "./images/" + imageName;
    console.log('image url link'+ imageUrl);
    
    var fs = require('fs');
    var stream = fs.createWriteStream(imageUrl);
    stream.once('open', function (fd) {
        stream.write(req.file.buffer);
        stream.end();
    });

    postEvent(
        {
            userId: req.body.userId,
            class: req.body.class,
            confidence: req.body.confidence,
            imageUrl: imageName
        }
    ).then((_) => {
        res.status(201).send();
    }).catch((_) => {
        console.log(_);
        
        const error = new Error('cant create it');
        error.status = 404;
        next(error);
    })
});

module.exports = router;
