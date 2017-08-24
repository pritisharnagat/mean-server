var mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    }
});

const contact = mongoose.model('Contact', contactSchema);

module.exports = contact;