const Job = require('../models/Job');
const Feedback = require('../models/Feedback');

exports.getDashboard = async (req, res) => {
  try {
    // Fetch user's submitted feedback
    const feedback = await Feedback.find({ user: req.user._id }).populate('job');

    // Get recent job matches (dummy data for now)
    const recentJobs = await Job.find().limit(5); // Or based on user's history

    res.status(200).json({
      message: 'Dashboard data fetched',
      feedback,
      recentJobs,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
};
