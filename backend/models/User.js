const mongoo = require('mongoose');
const { Schema } = mongoo;

const UserSchema = new Schema({
   
    name:{
        type : String ,
        required : true
    },
    email :{
        type : String,
        required : true,
        unique : true 
    },
    password:{
        type : String,
        required : true
    },
    date :{
        type : Date,
        default: Date.now,
    }


});

const user= mongoo.model('user' , UserSchema);
module.exports = user;