const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comments: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);
