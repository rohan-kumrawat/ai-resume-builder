const cron = require('node-cron');
const Job = require('../models/Job');
const Preferences = require('../models/Preferences');
const { scoreJobs } = require('../utils/aiUtils');
const { sendEmail } = require('../utils/emailService'); // Email utility for sending alerts

// Function to fetch and send job alerts
const sendJobAlerts = async () => {
  try {
    const usersWithPreferences = await Preferences.find().populate('user');

    for (const userPref of usersWithPreferences) {
      const { user, jobType, location, salaryRange, skills } = userPref;

      // Find jobs matching user preferences
      const jobs = await Job.find({
        jobType,
        location,
        salary: {
          $gte: salaryRange.min || 0,
          $lte: salaryRange.max || Infinity,
        },
        skills: { $in: skills },
      });

      if (jobs.length > 0) {
        const scores = await scoreJobs(skills, jobs);

        // Sort and format jobs
        const scoredJobs = jobs.map((job, index) => ({
          ...job.toObject(),
          score: scores[index],
        })).sort((a, b) => b.score - a.score);

        // Prepare job list for email
        const jobList = scoredJobs.map(job => `- ${job.title} (${job.company})`).join('\n');

        // Send email alert
        await sendEmail(user.email, 'Your Job Recommendations', `
          Hello ${user.name},\n\nHere are some jobs that match your preferences:\n\n${jobList}
        `);
      }
    }
    console.log('Job alerts sent successfully!');
  } catch (error) {
    console.error('Error sending job alerts:', error);
  }
};

// Schedule the job to run daily at 8:00 AM
cron.schedule('0 8 * * *', sendJobAlerts);

module.exports = { sendJobAlerts };
