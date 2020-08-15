const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true 
    },
    description: {
        type: String, 
        required: true 
    },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hostel'
    }
},{
    timestamps: true
});

const Notices = mongoose.model("Notice", noticeSchema);

module.exports = Notices
