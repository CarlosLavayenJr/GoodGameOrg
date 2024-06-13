const mongoose = require('mongoose');

const { Schema } = mongoose;

const leagueSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
    matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
    standings: [
      {
        team: { type: Schema.Types.ObjectId, ref: 'Team' },
        points: { type: Number, default: 0 },
        wins: { type: Number, default: 0 },
        losses: { type: Number, default: 0 },
        draws: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('League', leagueSchema);