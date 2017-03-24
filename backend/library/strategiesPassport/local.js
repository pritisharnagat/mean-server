var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var path 	= require('path');
var Errors = require('node-common-errors');
var UserLogin = require('../../models/userLoginDetails.js');
var User = require('../../models/userRegisterDetails.js');
var Project = require('../../models/projectDetails.js');
var RoleDetails = require('../../models/roleDetails.js');

module.exports = function(env,passport) {

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'emailID',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, emailID, password, done) {
        
            User.findOne({ 'emailID' : emailID }, function(err, user) { // find a user whose email is the same as the forms emai
                if (err)
                
                return done(new Errors.BadRequest('Not a valid email'));
                if (user) {
               
                return done(new Errors.BadRequest('Email already in use'));
                } 
                else 
                {
                    var newuser=new User();
                    var roleData =new RoleDetails();
                    var loginCredentials =new UserLogin();
                   /* newuser.img.data = fs.readFileSync(req.files.userPhoto.path)
                    newuser.img.contentType = ‘image/png’;*/
                    newuser.fullName= req.body.fullName;
                    newuser.companyName = req.body.companyName;
                    newuser.emailID = newuser.checkEmail(req.body.emailID);
                    newuser.password =newuser.generateHash(req.body.password);
                    loginCredentials.username=newuser.emailID;
                    loginCredentials.password=newuser.password;
                    
                     newuser.save(function(err,saveUser){
                         if(err){
                             console.log(err);
                             return false;
                         }
                         roleData.roleParent="receiver";
                         roleData.roleDescription = "";
                         roleData.roleName="";
                         roleData.save();
                         loginCredentials.save();
                         console.log('user registered in successfully');
                         return done(null, newuser);
                         
                     })
                    
                }

          

        })
 }));                  
 
    passport.use('local-signin', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true                                                     // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {                                        // callback with email and password from our form
        
        UserLogin.findOne({ 'username' : username }, function(err, user) { 
            if (err)
                return done(err);
             console.log("err "+err);
            if (!user){
                console.log('user not found');
                return done(null, false);
            }
            if (!user.comparePassword(password)){
                console.log('invalid Password');
                return done(null, false);
            }                                                                                      
            console.log('user %s logged in successfully', user._id);
            return done(null, {                                        //passed to callback of passport.serializeUser
                _id : user._id
        }
    );

    })}));
    passport.serializeUser(function(user, done) {
        console.log("serialized");
        console.log(user._id);
        done(null, user._id);                                        // used to serialize the user for the session
    });
    passport.deserializeUser(function(id, done) {
         console.log('in deser');
        UserLogin.findById({_id:id}, function(err, user) {
            console.log('no im not serial');
            done(err, user._id);
    });
    });

};