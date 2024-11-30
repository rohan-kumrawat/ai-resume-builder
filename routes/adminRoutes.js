const express = require('express');
const { getAllApplications, updateApplicationStatusByAdmin } = require('../controllers/adminController');
const { protect:authenticate,authorizeRoles } = require('../middlewares/authMiddleware'); 
const router = express.Router();

// Admin-only route to get all applications
router.get('/applications', authenticate, authorizeRoles('admin'), getAllApplications); // Corrected order

// Admin-only route to update application status
router.put('/applications/:applicationId/status', authenticate, authorizeRoles('admin'), updateApplicationStatusByAdmin); // Added authorizeRoles

module.exports = router;
