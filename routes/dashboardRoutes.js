const express = require('express');
const { protect:authenticate } = require('../middlewares/authMiddleware');
const { getDashboard } = require('../controllers/dashboardController');
const { getUserApplications } = require('../controllers/applicationController');
const { getUserJobs } = require('../controllers/jobController'); // Create this function in jobController.js

const router = express.Router();



router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const applications = await getUserApplications(req, res);
    const jobs = await getUserJobs(req, res); // You’ll need to define this function to get user jobs

    res.status(200).json({
      message: 'Dashboard retrieved',
      applications,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard data', error });
  }
});

module.exports = router;
