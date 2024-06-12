const Tournament = require('../models/Tournament');
const Match = require('../models/Match');
const Team = require('../models/Team');

const createTournament = async (req, res) => {
    const tournament = new Tournament(req.body);
    await tournament.save();
    res.send(tournament);
};

const getTournaments = async (req, res) => {
    const tournaments = await Tournament.find().populate('teams matches');
    res.send(tournaments);
};

const updateTournament = async (req, res) => {
    const tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(tournament);
};

const deleteTournament = async (req, res) => {
    await Tournament.findByIdAndDelete(req.params.id);
    res.send('Tournament deleted');
};

module.exports = { createTournament, getTournaments, updateTournament, deleteTournament };
