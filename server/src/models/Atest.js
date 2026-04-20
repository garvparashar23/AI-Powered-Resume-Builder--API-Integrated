const mongoose = require('mongoose');

const atestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetRole: { type: String, required: true },
  
  // Array of Resume IDs being compared
  resumeVariants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resume' }],
  
  // Results simulation
  results: [{
    resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume' },
    simulatedSuccessRate: { type: Number, default: 0 }, // e.g. 74%
    reasoning: { type: String, default: '' },
    heatmapScore: { type: Number, default: 0 }
  }],
  
  bestPerformingVariantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', default: null }

}, { timestamps: true });

module.exports = mongoose.model('Atest', atestSchema);
