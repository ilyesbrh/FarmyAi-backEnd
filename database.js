

const mysql = require('mysql');
/*=============================================
=              Database Setup                 =
=============================================*/

/*=====  Database Setup  ======*/

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'farmyai'
});

function connect() {

    connection.connect(function (err) {
        if (err) {
            console.log(err.stack);
            return;
        }
        else {
            console.log("connected");

        }
    });
}


//new Date().toISOString().slice(0, 19).replace('T', ' '); date to mysql Date
//().format('YYYY-MM-DD HH:mm:ss');



/**
 *
 * get 'user'
 * @param user : user object contain username and password
 * @returns promise: query result
 *
 */
function getuserId(user) {

    let query = `select * from user where username = '${user.username}' AND password = '${user.password}'`;

    return new Promise(function (resolve, reject) {
        connection.query(query, function (err, respTables) {
            if (err) {
                reject(err);
            }
            resolve(respTables);
        });
    });
}

function getEvents(id,offset,limit) {

    let query = `select * from event where userId = ${id} ORDER BY timestamp DESC  LIMIT ${offset}, ${limit}`;

    return new Promise(function (resolve, reject) {
        connection.query(query, function (err, respTables) {
            if (err) {
                reject(err);
            }
            resolve(respTables);
        });
    });
}

function addEvent(event) {

    
    let query = `INSERT INTO event (userId, moduleId, class, seen, confidence, imageURL)
                VALUES (${event.userId},${event.moduleId},'${event.class}',${false},${event.confidence},'${event.imageURL})'`;

    return new Promise(function (resolve, reject) {
        connection.query(query, function (err, respTables) {
            if (err) {
                reject(err);
            }
            resolve(respTables);
        });
    });

}

module.exports = {
    connect: connect,
    getUser: getuserId,
    getEvents: getEvents,
    PostEvent: addEvent
}