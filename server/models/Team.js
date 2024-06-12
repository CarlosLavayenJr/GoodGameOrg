const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    players: [String] // Simple string array for player names
});

module.exports = mongoose.model('Team', teamSchema);
