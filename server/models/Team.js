const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    captain: { type: Schema.Types.ObjectId, ref: 'User' },
    record: [{ type: Number }], // Array of [wins, losses]
    players: [{ type: String }],
    league: { type: Schema.Types.ObjectId, ref: 'League', required: function() { return !this.tournament; } },
    tournament: { type: Schema.Types.ObjectId, ref: 'Tournament', required: function() { return !this.league; } },
    images: [{ type: String }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
  },
  { timestamps: true }
);
module.exports = mongoose.model('Team', teamSchema);