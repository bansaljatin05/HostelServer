const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    studentName: {
        type: String, 
        required: true 
    },
    roomNo: {
        type: String, 
        required: true 
    },
    title: {
        type: String, 
        required: true 
    },
    complaint: {
        type: String, 
        required: true 
    }
});

const Complaints = mongoose.model("Complaint", complaintSchema);

module.exports = Complaints