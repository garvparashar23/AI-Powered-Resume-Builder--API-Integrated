const Resume = require('../models/Resume');

// @desc    Get user resumes
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (resume) {
      if (resume.userId.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
      }
      res.json(resume);
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
  try {
    const { name, email, skills, education, experience, projects, summary, templateId, status } = req.body;

    const resume = new Resume({
      userId: req.user._id,
      name,
      email,
      skills,
      education,
      experience,
      projects,
      summary,
      templateId,
      status
    });

    const createdResume = await resume.save();
    res.status(201).json(createdResume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (resume) {
      if (resume.userId.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
      }

      Object.assign(resume, req.body);
      const updatedResume = await resume.save();
      res.json(updatedResume);
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (resume) {
      if (resume.userId.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
      }

      await resume.deleteOne();
      res.json({ message: 'Resume removed' });
    } else {
      res.status(404);
      throw new Error('Resume not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getResumes, getResumeById, createResume, updateResume, deleteResume };
