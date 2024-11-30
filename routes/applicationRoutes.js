const express = require('express');
const { applyToJob } = require('../controllers/applicationController');
const upload = require('../middlewares/uploadMiddleware');
const { protect:authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/apply/:jobId',authenticate,  upload.single('resume'), applyToJob); // Use upload middleware to handle file upload and pass it to the controller

module.exports = router;
