const express = require('express');
const router = express.Router();
const getuserId = require('../../database').getUser;

router.get('/', (req, res, next) => {

    const name = req.query.username;
    const pass = req.query.password;

    getuserId({ username: name, password: pass })
        .then(resp => {
            console.log(resp);
            res.status(200).json(resp[0]);
        })
        .catch(err => {
            console.log(err);
        });
        
});

module.exports = router;

