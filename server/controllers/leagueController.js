const League = require('../models/League');
const Match = require('../models/Match');
const Team = require('../models/Team');

const createLeague = async (req, res) => {
    const league = new League(req.body);
    await league.save();
    res.send(league);
};

const getLeagues = async (req, res) => {
    const leagues = await League.find().populate('teams matches');
    res.send(leagues);
};

const updateLeague = async (req, res) => {
    const league = await League.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(league);
};

const deleteLeague = async (req, res) => {
    await League.findByIdAndDelete(req.params.id);
    res.send('League deleted');
};

module.exports = { createLeague, getLeagues, updateLeague, deleteLeague };
