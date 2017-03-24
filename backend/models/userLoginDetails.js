var mongoose = require('mongoose');
var crypto = require('crypto');
var assert = require('assert');
var bcrypt = require('bcrypt-nodejs');
var salt   = bcrypt.genSaltSync();    
var UserRegister = require('../models/userRegisterDetails.js');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var UserLogin =new Schema({
    username:{type: String},
    password:{type: String}
    
})
 UserLogin.methods.encrypt=function(key,password){
     var cipher = crypto.createCipher('aes-256-cbc', key);
     var encrypted = cipher.update(confirm_password, 'utf8', 'hex');     //encrypting password
     encrypted += cipher.final('hex');
     console.log(encrypted);
     return encrypted;
}
UserLogin.methods.decrypt=function(key,encrypted){
     var decipher = crypto.createDecipher('aes-256-cbc', key);          //decrypting password
     var dec = decipher.update(encrypted, 'hex', 'utf8')
     dec += decipher.final('utf8');
     console.log(dec);
     return dec;
}
UserLogin.methods.generateHash=function(password){
    
    return  bcrypt.hashSync(password,salt);
}
UserLogin.methods.comparePassword = function(password){
    return  bcrypt.compareSync(password, this.password) 
}

UserLogin.plugin(passportLocalMongoose);

module.exports=mongoose.model('userLoginDetails',UserLogin);