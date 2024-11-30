const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  status: {
    type: String,
    enum: ['applied', 'under review', 'interview', 'rejected', 'accepted'],
    default: 'applied',
  },
  appliedDate: { type: Date, default: Date.now },
  resume: { type: String, required: true }, // Path to uploaded resume
});

module.exports = mongoose.model('Application', applicationSchema);
