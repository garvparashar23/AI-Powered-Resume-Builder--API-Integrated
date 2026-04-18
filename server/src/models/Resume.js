const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  year: String,
});

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  duration: String,
  description: String,
});

const projectSchema = new mongoose.Schema({
  title: String,
  link: String,
  description: String,
});

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Phase 1: Versioning
  versionId: { type: Number, default: 1 },
  parentResumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', default: null },

  name: { type: String, default: '' },
  email: { type: String, default: '' },
  skills: { type: [String], default: [] },
  education: { type: [educationSchema], default: [] },
  experience: { type: [experienceSchema], default: [] },
  projects: { type: [projectSchema], default: [] },
  summary: { type: String, default: '' },
  
  // Custom added sections or metadata
  jobTitle: { type: String, default: '' }, 

  status: { type: String, enum: ['draft', 'completed'], default: 'draft' },
  templateId: { type: String, default: 'modern' },
  isPublic: { type: Boolean, default: false },
  
  // Phase 1: Analytics
  analytics: {
    atsScore: { type: Number, default: 0 },
    readabilityScore: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    lastAtsCheckJobDescription: { type: String, default: '' }
  }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
