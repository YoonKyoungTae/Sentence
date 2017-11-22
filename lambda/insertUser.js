"use strict";

var mysql = require('mysql');
var config = require('./config.js');

exports.insertUser = function (event, context, callback) {

    let userId = event['user_id'];

    if (config.env_dev) {
        userId = 'debug_user';
    }

    let connection = mysql.createConnection({
        host     : config.host,
        user     : config.user,
        password : config.password,
        database : config.database
    });

    let alreadyErr = {
        "result" : 100
    };

    connection.connect();
    connection.query('SELECT * FROM sentenceDB.users WHERE `user_id` = "' + userId + '";',
        function (err, rows, fields) {
            if (!err) {
                if (rows.length > 0) {
                    //아이디 존재
                    if (!config.env_dev) {
                        callback(null, alreadyErr);
                    } else {
                        console.log('Already exist user');
                    }
                    connection.end();
                } else {
                    //신규유저
                    inputUser(connection, userId, callback);
                }
            } else {
                callback(null, error);
                console.log('DB에러');
                connection.end();
            }
        }
    );
};

function inputUser(connection, id, callback) {
    connection.query('INSERT INTO `sentenceDB`.`users` (`user_id`)' +
    	                    'VALUES ("' + id + '")',
    	function (err, rows, fields) {
            if (!err) {
                if (!config.env_dev) {
                    callback(null, sucessUser);
                } else {
                    console.log('회원가입 완료');
                }
            } else {
                callback(null, error);
                console.log('DB에러');
            }

    	});
    connection.end();
}
