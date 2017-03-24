var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RoleDetailSchema = new Schema({
    roleName:{type: String},
    roleDescription:{type: String},
    roleParent:{type:String}
    
});
 


module.exports = mongoose.model('roleDetails',RoleDetailSchema);