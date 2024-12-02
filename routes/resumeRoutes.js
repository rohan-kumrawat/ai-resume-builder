const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const { protect } = require('../middlewares/authMiddleware');
const { submitResume } = require('../controllers/resumeController');
const router = express.Router();
const { parseResume } = require('../utils/aiUtils');
const { savePersonalDetails } = require('../controllers/resumeController');
const { saveSkills } = require('../controllers/resumeController');
const { saveExperience } = require('../controllers/resumeController');

router.post('/',protect, submitResume);

router.post('/upload', upload.single('resume'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File upload failed' });
  }

  try {
    const parsedData = await parseResume(req.file.path);
    res.status(200).json({ message: 'File uploaded and parsed successfully', data: parsedData });
  } catch (error) {
    res.status(500).json({ message: 'Error parsing resume' });
  }
});

router.post('/personal-details', protect, savePersonalDetails);

router.post('/skills', protect, saveSkills);

router.post('/experience', protect, saveExperience);

module.exports = router;
