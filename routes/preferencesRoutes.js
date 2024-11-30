const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getPreferences, setPreferences } = require('../controllers/preferencesController');

const router = express.Router();

// Routes to get and set preferences
router.get('/', protect, getPreferences);
router.post('/', protect, setPreferences);

module.exports = router;
