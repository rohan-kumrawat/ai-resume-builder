const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  jobType: {
    type: String
  },
  salary: {
    type: Number,
  },
  experienceLevel: {
    type: String
  },
  skills: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Job', JobSchema);
