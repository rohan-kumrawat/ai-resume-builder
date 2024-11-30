const Application = require('../models/Application');
const Job = require('../models/Job');
const io = require('../app');

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

exports.getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id })
      .populate('job', 'title company location')
      .sort({ appliedDate: -1 });

    if (!applications.length) {
      return res.status(404).json({ message: 'No applications found' });
    }

    res.status(200).json({ message: 'Applications retrieved', applications });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving applications', error });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  try {
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Update the application status
    application.status = status;
    await application.save();

    // Emit notification to the user
    const notification = {
      userId: application.user,
      message: `Your application status for job "${application.job.title}" has been updated to: ${status}`,
    };

    io.emit('application-status-update', notification); // Emit to the user via Socket.io

    res.status(200).json({ message: 'Application status updated', application });
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status', error });
  }
};

