"use strict";

var errorMaker = require('./errorMaker');

module.exports = {
    alreadyExistError : errorMaker(100, 'Already exist user'),
    alreadyExistError2 : errorMaker(100, 'Already exist user')
};

