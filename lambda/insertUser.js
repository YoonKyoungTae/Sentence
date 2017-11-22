"use strict";

var mysql = require('mysql');
var config = require('./config.js');
var error = require('./error/error.js');

exports.insertUser = function (event, context, callback) {

    let userId = event['user_id'];

    if (!userId) {
        config.response(error.user_requireID, callback);
        return;
    }

    let connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    });

    connection.connect();
    connection.query('SELECT * FROM '+ config.db_table_users +' WHERE `user_id` = "' + userId + '";',
        function (err, rows, fields) {
            if (!err) {
                if (rows.length > 0) {
                    config.response(error.user_alreadyExist, callback);
                    connection.end();
                } else {
                    //신규유저
                    connection.query('INSERT INTO '+ config.db_table_users +' (`user_id`)' +
                        'VALUES ("' + userId + '")',
                        function (err, rows, fields) {
                            if (!err) {
                                config.response({
                                    msg : '회원가입 성공'
                                }, callback);
                                connection.end();
                            } else {
                                config.response(error.db_error, callback);
                                connection.end();
                            }

                        }
                    );
                }
            } else {
                config.response(error.db_error, callback);
                connection.end();
            }
        }
    );
};