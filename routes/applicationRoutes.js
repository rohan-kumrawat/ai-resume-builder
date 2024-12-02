const express = require('express');
const { applyToJob } = require('../controllers/applicationController');
const upload = require('../middlewares/uploadMiddleware');
const { protect:authenticate, protect:getUserApplications, protect:updateApplicationStatus } = require('../middlewares/authMiddleware');
const resumeRoutes = require('./resumeRoutes');

const router = express.Router();

router.post('/apply/:jobId',authenticate,  upload.single('resume'), applyToJob); // Use upload middleware to handle file upload and pass it to the controller
router.get('/', authenticate, getUserApplications); // Get user applications
router.put('/:applicationId/status', authenticate, updateApplicationStatus); // Update application status
router.use('/resume', resumeRoutes);

module.exports = router;
