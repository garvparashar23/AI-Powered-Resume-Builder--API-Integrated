const mongoose = require('mongoose');

const globalAnalyticsSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  totalDownloads: { type: Number, default: 0 },
  resumesCreated: { type: Number, default: 0 },
  averageAtsScore: { type: Number, default: 0 },
  // specific feature usage
  atsChecksPerformed: { type: Number, default: 0 },
  toneOptimizationsPerformed: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Analytics', globalAnalyticsSchema);
