var _mysqlconnection = null;
var mysql = require('mysql');




// const pool = mysql.createPool({
//     connectionLimit: 100,
//     multipleStatements: true,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
// });
var pool = mysql.createPool({
    connectionLimit: 100,
    multipleStatements: true,
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'playaround',
});




var mysql = function () { };
mysql.prototype.connect = function (callback) {
    // body...
    if (!_mysqlconnection) {
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null);
            } else {
                _mysqlconnection = connection;
                callback(null, _mysqlconnection);
            }
        });
    } else {
        callback(null, _mysqlconnection);
    }

};

mysql.prototype.release = function (callback) {
    // body...
    if (_mysqlconnection) {
        _mysqlconnection.release();
        _mysqlconnection = null;
        callback(1);
    }
    callback(-1);
};

mysql.prototype.execute = function (query, callback) {
    this.connect(function (err, db) {
        if (err) {

            var title = "MySql Connection ";

            if (_mysqlconnection) {
                _mysqlconnection.release();
            }

            _mysqlconnection = null;
            callback(err, null)
        } else {
            db.query(query, function (err, data) {
                if (err) {
                    ;
                    var title = "MySql Query ";

                    if (_mysqlconnection) {
                        _mysqlconnection.release();
                    }

                    _mysqlconnection = null;

                    callback(err, null)
                } else {
                    callback(null, data)
                }
            });
        }
    })
}



exports.MySql = mysql;