var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-sendgrid-transport');
var User = require('../../models/userRegisterDetails.js');
var options={
    auth:{
        api_user: 'riyachakraborty',
        api_key : 'chakraborty123'
    }
}

var client = nodemailer.createTransport(smtpTransport(options));
var key = "supersecretkey";

router.get('/resetpassword/:emailID', function(req, res) {
    var emailID=req.params.emailID;
 User.findOne({emailID:emailID},function(err,user){
     if(err){
         res.status(400);
         res.json({success:false,message:'err'});
     }
     else{
      if(!user){
         console.log('invalid');
         res.status(400);
          res.json({success:false,
    message : "email not found" 
  });
      }
     else {
           var mailoptions={
             from:'user@myDomain.com',
             to:user.email,
             subject:'Activation link for password',
             text:' Hello ',
             html:' <pre> Hello </pre>'
         };
  
          client.sendMail(mailoptions,function(err,info){
              if(err){
                  console.log(err);
            }
              else{
              console.log(info.message);
              }
             
              });
             
             res.json({success:true,message:'An email has been sent regarding password to your email'+ user.emailID});
             }
          
         }
     
    
 });
  });
module.exports = router;