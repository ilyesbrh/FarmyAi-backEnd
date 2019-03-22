const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const cors = require('cors');
const connect = require('./database').connect;
const app = express();

const eventRoutes = require('./api/routes/event');
const loginRoutes = require('./api/routes/login');
const moduleRoutes = require('./api/routes/module');

connect(); // call to connect function in database.js

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());


app.use('/event', eventRoutes);
app.use('/login', loginRoutes);
app.use('/module', moduleRoutes);

app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;

