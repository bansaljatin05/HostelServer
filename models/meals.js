const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Meals = mongoose.model("Meal", mealSchema);

module.exports = Meals