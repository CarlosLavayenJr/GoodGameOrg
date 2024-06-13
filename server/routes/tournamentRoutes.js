const express = require('express');
const { createTournament, getTournaments, updateTournament, deleteTournament } = require('../controllers/tournamentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/tournaments', authMiddleware, createTournament);
router.get('/tournaments', authMiddleware, getTournaments);
router.put('/tournaments/:id', authMiddleware, updateTournament);
router.delete('/tournaments/:id', authMiddleware, deleteTournament);

module.exports = router;
