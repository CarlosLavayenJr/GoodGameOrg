const mongoose = require('mongoose');

const { Schema } = mongoose;

const tournamentSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
    matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tournament', tournamentSchema);