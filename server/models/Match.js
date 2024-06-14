const mongoose = require('mongoose');

const { Schema } = mongoose;

const matchSchema = new Schema(
  {
    tournament: { type: Schema.Types.ObjectId, ref: 'Tournament', required: function() { return !this.league; } },
    league: { type: Schema.Types.ObjectId, ref: 'League', required: function() { return !this.tournament; } },
    team1: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    team2: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    date: { type: Date, required: true },
    result: {
      team1Score: { type: Number, default: 0 },
      team2Score: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Match', matchSchema);