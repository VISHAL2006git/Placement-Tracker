const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    applicationDate:{
        type:Date,
        required:true
    },
    applicationType:{
        type:String,
        required:true
    }
});

const Application = mongoose.model(
    'Application',
    applicationSchema
);

module.exports = Application;