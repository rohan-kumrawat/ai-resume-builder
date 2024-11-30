const Application = require('../models/Application');
const Job = require('../models/Job');

exports.applyToJob = async (req, res) => {
  const { jobId } = req.params;
  const { resume } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if the user has already applied
    const existingApplication = await Application.findOne({
      user: req.user._id,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }

    const application = new Application({
      user: req.user._id,
      job: jobId,
      resume:req.file.path, // Assuming a link to the resume is provided
    });

    await application.save();

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Error applying to job', error });
  }
};
