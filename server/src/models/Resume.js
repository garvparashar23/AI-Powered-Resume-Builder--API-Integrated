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
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  skills: { type: [String], default: [] },
  education: { type: [educationSchema], default: [] },
  experience: { type: [experienceSchema], default: [] },
  projects: { type: [projectSchema], default: [] },
  summary: { type: String, default: '' },
  status: { type: String, enum: ['draft', 'completed'], default: 'draft' },
  templateId: { type: String, default: 'modern' }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
