const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' },
    homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    date: Date,
    result: {
        homeScore: Number,
        awayScore: Number
    }
});

module.exports = mongoose.model('Match', matchSchema);
