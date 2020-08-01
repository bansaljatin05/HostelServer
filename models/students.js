const mongoose = require('mongoose');
const Schema = mongoose.Schema

const studentSchema = new Schema({
    studentName: {
        type: String, 
        required: true 
    },
    sid: {
        type: String, 
        unique: true, 
        required: true
    },
    mobileNo: {
        type: String, 
        unique: true, 
        required: true 
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        unique: true, 
        required: true 
    },
    branch: {
        type: String,
        unique: true,
        required: true
    },
    nationality: {
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true,
    },
    fatherName: {
        type: String, 
        required: true 
    },
    motherName: {
        type: String, 
        required: true 
    },
    fatherMobile: {
        type: String, 
        unique: true, 
        required: true 
    },
    dob: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        require: true
    } 
});

const Students = mongoose.model("Student", studentSchema);

module.exports = Students