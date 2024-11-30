const express = require('express');
const { getAllApplications, updateApplicationStatusByAdmin } = require('../controllers/adminController');
const { protect:authenticate, protect:authorizeAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

// Admin-only route to get all applications
router.get('/applications', authenticate, authorizeAdmin, getAllApplications);

// Admin-only route to update application status
router.put('/applications/:applicationId/status', authenticate, authorizeAdmin, updateApplicationStatusByAdmin);

module.exports = router;
