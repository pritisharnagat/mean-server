const express = require('express');
const router = express.Router();

const Contact = require('../models/contact')

// Retriving Contacts
router.get('/contacts', function(req, res, next){
    //res.send('Retreving Contact List..');
    Contact.find(function(err, docs){
        res.json(docs);
    });
});

// Adding Contacts
router.post('/contact', function(req, res, next){
    var newContact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    newContact.save(function(err, doc){
        if(err){
            res.json({msg: 'Failed to save contact.'});
        } else {
            res.json({msg: 'Contact is successfully saved'});
        }
    });
});

// Retriving Contacts
router.put('/contacts/:contactId', function(req, res, next){
    //res.send('Retreving Contact List..');
    Contact.findOneAndUpdate({"_id": req.params.contactId },
    {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
    },
    {
        sort: {_id: -1},
        upsert: true
    },
    function(err, result){
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// Deleting Contact
router.delete('/contact/:contactId', function(req, res, next){
    Contact.remove({_id: req.params.contactId}, function(err, result){
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;