const express = require('express');
const router = express.Router();
const { generateSummary, checkAtsScore, importGithubProjects, getMarketIntel, getVideoScript, getInterviewPrep } = require('../controllers/aiController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/generate-summary', protect, generateSummary);
router.post('/ats-score', protect, checkAtsScore);
router.post('/github-import', protect, importGithubProjects);
router.post('/market-intel', protect, getMarketIntel);
router.post('/video-script', protect, getVideoScript);
router.post('/interview-prep', protect, getInterviewPrep);

module.exports = router;
