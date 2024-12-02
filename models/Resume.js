const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  personalDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  skills: {
    type: [String],
    required: true,
  },
  experience: [
    {
      company: String,
      position: String,
      duration: String,
      description: String,
    },
  ],
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      yearOfCompletion: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
