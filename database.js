

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

function geteventsAll(id){
    let query = `select * from event where userId = ${id} ORDER BY timestamp DESC`;

    return new Promise(function (resolve, reject) {
        connection.query(query, function (err, respTables) {
            if (err) {
                reject(err);
            }
            resolve(respTables);
        });
    });
}


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

    let query = `select * from event where userId = ${id} ORDER BY timestamp DESC  LIMIT ${offset}, ${limit} `;

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
                VALUES (${event.userId},null,'${event.class}',${false},${event.confidence},'${event.imageUrl}')`;

    return new Promise(function (resolve, reject) {
        connection.query(query, function (err, respTables) {
            if (err) {
                reject(err);
            }
            resolve(respTables);
        });
    });

}
function markAsSeen(id) {

    
    let query = `UPDATE event SET seen = true WHERE id = ${id}`;

    return new Promise(function (resolve, reject) {
        connection.query(query, function (err, respTables) {
            if (err) {
                reject(err);
            }
            resolve(respTables);
        });
    });

}
function liveNotification(id) {

    let query = `SELECT * FROM event WHERE timestamp > (NOW() - INTERVAL 1 MINUTE) AND userId = ${id}`;

    return new Promise(function (resolve, reject) {
        connection.query(query, function (err, respTables) {
            if (err) {
                reject(err);
            }
            resolve(respTables);
        });
    });

}
function eventsCount(id) {

    let query = `SELECT count(id) as count FROM event WHERE userId = ${id}`;

    return new Promise(function (resolve, reject) {
        connection.query(query, function (err, respTables) {
            if (err) {
                reject(err);
            }
            resolve(respTables[0].count);
        });
    });

}
function appearance(id) {

    let query = `SELECT class , COUNT(class) as appear FROM event WHERE userId = ${id} GROUP BY class LIMIT 4`;

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
    PostEvent: addEvent,
    AllEvent: geteventsAll,
    eventsCount: eventsCount,
    liveNotification: liveNotification,
    getAnimalsStats: appearance,
    markAsSeen: markAsSeen
}