const express = require('express');
const { analyzeResume, getAtsScore, getVideoScript, getInterviewPrep, enhanceProjectDescription } = require('../controllers/intelligenceController');

const router = express.Router();

// General intelligence scanner (from Phase 6)
router.post('/analyze/:resumeId', analyzeResume);

// Immediate routes for UI Modals (Scan, Pitch, Prep)
router.post('/ats-score', getAtsScore);
router.post('/video-script', getVideoScript);
router.post('/interview-prep', getInterviewPrep);
router.post('/enhance-project', enhanceProjectDescription);

module.exports = router;
