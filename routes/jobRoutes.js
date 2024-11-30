const express = require('express');
const { matchJobs } = require('../controllers/jobController');
const { searchJobs } = require('../controllers/jobController');
const router = express.Router();

// Job matching route
router.post('/match', matchJobs);

//Advanced search endpoint
router.get('/search', searchJobs);

module.exports = router;
