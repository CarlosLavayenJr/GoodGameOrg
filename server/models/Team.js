const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    players: [{ type: String }], // Array of player names
  },
  { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);