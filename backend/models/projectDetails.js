var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var ProjectSchema  = new Schema({
   
     title : {type:String}    

    

    })
     
      
    


module.exports=mongoose.model('projectDetails',ProjectSchema);