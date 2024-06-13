const Match = require('../models/Match');

const createMatch = async (req, res) => {
    const match = new Match(req.body);
    await match.save();
    res.send(match);
};

const getMatches = async (req, res) => {
    const matches = await Match.find().populate('homeTeam awayTeam');
    res.send(matches);
};

const updateMatch = async (req, res) => {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(match);
};

const deleteMatch = async (req, res) => {
    await Match.findByIdAndDelete(req.params.id);
    res.send('Match deleted');
};

module.exports = { createMatch, getMatches, updateMatch, deleteMatch };
