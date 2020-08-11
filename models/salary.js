const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true 
    },
    month: {
        type: Date, 
        required: true 
    },
    salary: {
        type: String, 
        required: true 
    },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostels'
    },
});

const Salary = mongoose.model("Salary", salarySchema);

module.exports = Salary