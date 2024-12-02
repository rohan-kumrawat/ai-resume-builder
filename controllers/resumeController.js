const Resume = require('../models/Resume'); // Assume you have a Resume model

exports.submitResume = async (req, res) => {
  try {
    const resume = new Resume({ ...req.body, user: req.user._id });
    await resume.save();
    res.status(201).json({ message: 'Resume submitted successfully', resume });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
exports.savePersonalDetails = async (req, res) => {
  const { name, email } = req.body;

  try {
    let resume = await Resume.findOne({ user: req.user._id });

    if (!resume) {
      resume = new Resume({ user: req.user._id, personalDetails: { name, email } });
    } else {
      resume.personalDetails = { name, email };
    }

    await resume.save();
    res.status(201).json({ message: 'Personal details saved', resume });
  } catch (error) {
    res.status(500).json({ message: 'Error saving personal details', error });
  }
};

exports.saveSkills = async (req, res) => {
  const { skills } = req.body;

  try {
    let resume = await Resume.findOne({ user: req.user._id });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    resume.skills = skills;
    await resume.save();

    res.status(200).json({ message: 'Skills saved', resume });
  } catch (error) {
    res.status(500).json({ message: 'Error saving skills', error });
  }
};
