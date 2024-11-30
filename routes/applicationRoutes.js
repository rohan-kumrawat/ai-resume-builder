const express = require('express');
const { applyToJob } = require('../controllers/applicationController');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');

router.post('/apply/:jobId', authenticate, applyToJob);

module.exports = router;
