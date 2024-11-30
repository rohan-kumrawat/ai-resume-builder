const Preferences = require('../models/Preferences');

// Get user preferences
exports.getPreferences = async (req, res) => {
  try {
    const preferences = await Preferences.findOne({ user: req.user._id });

    if (!preferences) {
      return res.status(404).json({ message: 'Preferences not found' });
    }

    res.status(200).json({ message: 'Preferences fetched', preferences });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching preferences', error });
  }
};

// Update or set user preferences
exports.setPreferences = async (req, res) => {
  const { jobType, location, salaryRange, skills } = req.body;

  try {
    let preferences = await Preferences.findOne({ user: req.user._id });

    if (preferences) {
      preferences.jobType = jobType || preferences.jobType;
      preferences.location = location || preferences.location;
      preferences.salaryRange = salaryRange || preferences.salaryRange;
      preferences.skills = skills || preferences.skills;
    } else {
      preferences = new Preferences({
        user: req.user._id,
        jobType,
        location,
        salaryRange,
        skills,
      });
    }

    await preferences.save();
    res.status(200).json({ message: 'Preferences updated', preferences });
  } catch (error) {
    res.status(500).json({ message: 'Error updating preferences', error });
  }
};
