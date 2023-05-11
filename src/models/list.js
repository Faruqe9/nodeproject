const mongoose = require("mongoose");

const validator = require("validator");

const listSchema = new mongoose.Schema({
    user : {
        type: String,
        required : true
        
       },
   company : {
    type: String,
    required : true
    
   },
   contact : {
    type: String,
    required : true
    
   },
   
   
date: {
    type: String,
    
    required : true

},

bio: {
    type: String,
    required : true

}

});

//create new collection

const List = new mongoose.model('List', listSchema);

module.exports = List;