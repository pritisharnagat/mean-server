var path            = require('path');
var fs 				= require('fs');
module.exports = function (req, res, next) {
                                         // if user is authenticated in the session, carry on
    if (req.user) {
        next();
    }
                                             // if they aren't redirect them to the login page
    else {
      res.send({message:"user not authorized"});
    }
};