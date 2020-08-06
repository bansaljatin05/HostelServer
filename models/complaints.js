const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    studentName: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    roomNo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Seat' 
    },
    title: {
        type: String, 
        required: true 
    },
    complaint: {
        type: String, 
        required: true 
    },
});

const Complaints = mongoose.model("Compliant", complaintSchema);

module.exports = Complaints