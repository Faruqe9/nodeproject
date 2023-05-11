const mongoose = require("mongoose");

const validator = require("validator");

const customerSchema = new mongoose.Schema({
    email : {
        type: String,
        required : true,
        unique: [true , "email id is already owned"],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            };
        }
       },
   firstname : {
    type: String,
    required : true,
    minlength : 3
   },
   lastname : {
    type: String,
    required : true,
    minlength : 3
   },
   
   password: {
    type: String,
    minlength: 6,
    required : true,

},
confirmpassword: {
    type: String,
    minlength: 6,
    required : true,

}
});

//create new collection

const Customer = new mongoose.model('Customer', customerSchema);

module.exports = Customer;