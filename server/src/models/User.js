const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Phase 1: Pro Features
  role: { type: String, enum: ['user', 'admin', 'recruiter'], default: 'user' },
  plan: { type: String, enum: ['free', 'pro'], default: 'free' },
  tokensUsed: { type: Number, default: 0 },
  preferences: {
    targetTone: { type: String, enum: ['corporate', 'startup', 'research', 'modern'], default: 'modern' },
    targetRoles: { type: [String], default: [] }
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
