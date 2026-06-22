const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    cgpa:{
        type:Number,
        required:true
    },
    graduationYear:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
});

const User = mongoose.model('User',userSchema);

module.exports = User;