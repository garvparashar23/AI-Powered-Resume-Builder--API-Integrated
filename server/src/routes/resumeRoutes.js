const express = require('express');
const router = express.Router();
const {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  getPublicResume
} = require('../controllers/resumeController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(protect, getResumes).post(protect, createResume);
router
  .route('/:id')
  .get(protect, getResumeById)
  .put(protect, updateResume)
  .delete(protect, deleteResume);

router.route('/share/:id').get(getPublicResume);

module.exports = router;
