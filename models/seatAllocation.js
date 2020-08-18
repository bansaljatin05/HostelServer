const mongoose = require('mongoose');

const seatAllcationSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true 
    },
    block: {
        type: String, 
        required: true 
    },
    room: {
        type: String, 
        required: true 
    },
    monthlyRent: {
        type: String, 
        required: true 
    },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel'
    },
});

const Seat = mongoose.model("SeatAllocation", seatAllcationSchema);
module.exports = Seat