const express = require('express');
const router = express.Router();
const { getSystemMetrics } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.get('/metrics', protect, admin, getSystemMetrics);

module.exports = router;
