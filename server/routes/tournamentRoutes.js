const express = require('express');
const { JsonDatabase } = require('brackets-json-db');
const { BracketsManager } = require('brackets-manager');
const { authMiddleware } = require('../utils/auth'); // Ensure this exports a middleware function

const router = express.Router();
const storage = new JsonDatabase();
const manager = new BracketsManager(storage);

router.get('/tournament-data', authMiddleware, async (req, res) => {
  try {
    const tournamentData = await manager.get.tournamentData();
    res.json(tournamentData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tournament data' });
  }
});

module.exports = router;
