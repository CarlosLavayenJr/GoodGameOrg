const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    startDate: Date,
    endDate: Date,
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }]
});

module.exports = mongoose.model('Tournament', tournamentSchema);
