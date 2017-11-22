"use strict";

var errorMaker = require('./errorMaker');

module.exports = {
    user_requireID : errorMaker(100, 'Please write user ID'),
    user_alreadyExist : errorMaker(100, 'Already exist user'),


    db_error : errorMaker(999, 'Database Error')
};

