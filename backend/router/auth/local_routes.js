'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var authenticated = require('../../globalFunction.js');
module.exports = function (passport) {

router.post('/signin',
    passport.authenticate('local-signin'), function(req,res){

        if(res.status(200)){
            res.send({
                status: true
            });
        } else {
            res.send({
                status: false
            });
        }
    });
router.post('/register', passport.authenticate('local-signup'), function(req, res){
   
   if(res.status(200)){
       res.send({
        status: true
    });
   }
    else{
        res.send({
        status: false
    });
    }
   
});
/*router.get('/signout', function(req, res) {
        req.session.user = null;
        req.logout(); 
        res.redirect('/');
    });
*/



return router;
}
