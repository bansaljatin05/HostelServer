const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    day: String,
    time: String,
    itemName: String
});

const Meals = mongoose.model("Meal", mealSchema);

module.exports = Meals