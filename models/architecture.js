const mongoose = require('mongoose');

const architectureSchema = new mongoose.Schema({
    rooms: {
        type: String,
        required: true
    },
    blocks: {
        type: String,
        required: true
    },
    floors: {
        type: String,
        required: true
    },
},{
    type: String,
    required: true
});

const Architecture = mongoose.model("Architecture", architectureSchema);

module.exports = Architecture