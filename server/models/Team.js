const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    players: [{ type: String }], // Array of player names
    league: { type: Schema.Types.ObjectId, ref: 'League', required: function() { return !this.tournament; } },
    tournament: { type: Schema.Types.ObjectId, ref: 'Tournament', required: function() { return !this.league; } },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);