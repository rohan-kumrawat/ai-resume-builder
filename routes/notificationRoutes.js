const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { getNotifications, markAsRead } = require('../controllers/notificationController');

const router = express.Router();

// Fetch notifications
router.get('/', protect, getNotifications);

// Mark a notification as read
router.put('/:id/read', protect, markAsRead);

module.exports = router;
