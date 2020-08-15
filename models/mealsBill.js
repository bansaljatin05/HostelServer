const mongoose = require('mongoose');

const messBillSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true 
    },
    sid: {
        type: String, 
        required: true,
        unique: true 
    },
    branch: {
        type: String, 
        required: true 
    },
    payment: {
        type: String, 
        required: true 
    },
    paymentDate: {
        type: Date, 
        required: true 
    },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel'
    },
});

const Meals = mongoose.model("MessBill", messBillSchema);

module.exports = Meals