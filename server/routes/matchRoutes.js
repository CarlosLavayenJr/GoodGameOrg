const express = require('express');
const { createMatch, getMatches, updateMatch, deleteMatch } = require('../controllers/matchController'); // Correct the path
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/matches', authMiddleware, createMatch);
router.get('/matches', authMiddleware, getMatches);
router.put('/matches/:id', authMiddleware, updateMatch);
router.delete('/matches/:id', authMiddleware, deleteMatch);

module.exports = router;
