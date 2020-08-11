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
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostels'
    }
});

const Complaints = mongoose.model("Complaint", complaintSchema);

module.exports = Complaints