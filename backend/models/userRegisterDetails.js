'use strict';

var mongoose = require('mongoose');
var validator = require('mongoose-unique-validator');
var assert = require('assert');
var bcrypt = require('bcrypt-nodejs');
var salt   = bcrypt.genSaltSync();    
var emailValidator = require("email-validator");
var Project = require('../models/projectDetails.js');
var RoleDetails = require('../models/roleDetails.js');
var UserLogin = require('../models/userLoginDetails.js');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var UserRegister = new Schema({
  /*  img: { data: Buffer, contentType: String },*/
    fullName:{type:String},
    companyName:{type:String},
    emailID:{type:String},
    password:{type:String},
    loginID:{type: Schema.Types.ObjectId, ref: 'UserLogin'},
    roleID: {type: Schema.Types.ObjectId, ref: 'RoleDetails'},
     
    
});
UserRegister.methods.checkEmail = function(emailID){
      var mail = emailValidator.validate(emailID);
        if(mail===true){
            return emailID;
        }
    else{
         console.log("enter valid email");
    }
}
UserRegister.methods.generateHash=function(password){
    
    return  bcrypt.hashSync(password,salt);
}
UserRegister.methods.comparePassword = function(password){
    return  bcrypt.compareSync(password, this.password) 
}

UserRegister.plugin(validator);

UserRegister.plugin(passportLocalMongoose);

module.exports=mongoose.model('userRegisterDetails',UserRegister);
