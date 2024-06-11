const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Match' }],
    standings: [{
        team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
        points: Number,
        wins: Number,
        losses: Number,
        draws: Number
    }]
});

module.exports = mongoose.model('League', leagueSchema);
