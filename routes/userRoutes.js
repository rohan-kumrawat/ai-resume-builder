const express = require('express');
const { protect, admin } = require('../middlewares/authMiddleware');
const { updateProfile } = require('../controllers/userController');
const router = express.Router();


router.get('/profile', protect, (req, res) => {
  res.json({ message: 'User profile', user: req.user });
});

router.get('/admin', protect, admin, (req, res) => {
  res.json({ message: 'Admin panel access granted' });
});
router.put('/profile', protect, updateProfile);

module.exports = router;
