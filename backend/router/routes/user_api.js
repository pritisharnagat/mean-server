var mongoose = require('mongoose');
var express = require('express');
var fs = require('fs');
var router = express.Router();
var User = require('../../models/userRegisterDetails.js');
var RoleDetails = require('../../models/roleDetails.js');
var Project = require('../../models/projectDetails.js');
var authenticated = require('../../globalFunction.js');

router.get('/role', authenticated, function (req, res) {
         /*console.log(req.user);*/
		 RoleDetails.find(function (err, data) {
			if (err) {
				return res.status(500).send(err);
			}
            res.send({message:"Authenticated User"}); 
			console.log(data);
		});
	});
/*router.get('/checkauth', authenticated, function(req, res){

    res.status(200).json({
    status: 'Authenticated Successfully'
    });
});
*/
module.exports = router;