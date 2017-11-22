'use strict';
process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';

console.log("Hello node.js");
console.log("NODE_ENV : " + process.env.NODE_ENV);
//## TEST Function ##//
let postData = {
    "user_id": "myName"
};

// require('./lambda/insertUser.js').insertUser(postData);

var error = require('./lambda/error/error.js');
console.log(error.alreadyExistError);


