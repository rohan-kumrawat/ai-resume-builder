const Application = require('../models/Application');
const Job = require('../models/Job');

// Get all job applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find({})
      .populate('user', 'name email')
      .populate('job', 'title company location')
      .sort({ appliedDate: -1 });

    if (!applications.length) {
      return res.status(404).json({ message: 'No applications found' });
    }

    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving applications', error });
  }
};

// Update application status by admin
exports.updateApplicationStatusByAdmin = async (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;

  try {
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    await application.save();

    res.status(200).json({ message: 'Application status updated', application });
  } catch (error) {
    res.status(500).json({ message: 'Error updating application status', error });
  }
};
