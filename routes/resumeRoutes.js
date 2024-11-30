const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();
const { parseResume } = require('../utils/aiUtils');

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


module.exports = router;
