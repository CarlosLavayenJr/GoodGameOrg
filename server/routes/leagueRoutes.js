const express = require('express');
const { createLeague, getLeagues, updateLeague, deleteLeague } = require('../../controllers/leagueController');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

router.post('/leagues', authMiddleware, createLeague);
router.get('/leagues', authMiddleware, getLeagues);
router.put('/leagues/:id', authMiddleware, updateLeague);
router.delete('/leagues/:id', authMiddleware, deleteLeague);

module.exports = router;
