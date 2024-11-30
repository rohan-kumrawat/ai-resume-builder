const express = require('express');
const Feedback = require('../models/Feedback');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { jobId, rating, comments } = req.body;

  try {
    const feedback = await Feedback.create({
      user: req.user._id,
      job: jobId,
      rating,
      comments,
    });

    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
});

module.exports = router;
