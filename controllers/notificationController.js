const Notification = require('../models/Notification');

// Get user notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Notifications fetched',
      notifications,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (notification && notification.user.toString() === req.user._id.toString()) {
      notification.isRead = true;
      await notification.save();

      res.status(200).json({ message: 'Notification marked as read' });
    } else {
      res.status(404).json({ message: 'Notification not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification', error });
  }
};
