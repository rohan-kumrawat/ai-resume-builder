const mongoose = require('mongoose');

const PreferencesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  jobType: { type: String, enum: ['Full-time', 'Part-time', 'Remote', 'Contract'], default: 'Full-time' },
  location: { type: String },
  salaryRange: {
    min: { type: Number },
    max: { type: Number },
  },
  skills: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Preferences', PreferencesSchema);
