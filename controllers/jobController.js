const Job = require('../models/Job');
const Preferences = require('../models/Preferences'); // Import Preferences model
const { scoreJobs } = require('../utils/aiUtils');

exports.matchJobs = async (req, res) => {
  try {
    // Fetch user preferences
    const preferences = await Preferences.findOne({ user: req.user._id });

    // Build query based on preferences
    let query = {};

    if (preferences) {
      query = {
        jobType: preferences.jobType,
        location: preferences.location,
        salary: {
          $gte: preferences.salaryRange?.min || 0,
          $lte: preferences.salaryRange?.max || Infinity,
        },
        skills: { $in: preferences.skills }, // Filter jobs by preferred skills
      };
    } else {
      // If no preferences, fallback to using skills from request body
      const { skills } = req.body;
      query.skills = { $in: skills }; // Find jobs with at least one matching skill
    }

    // Find jobs based on query
    const jobs = await Job.find(query);

    if (!jobs.length) {
      return res.status(404).json({ message: 'No matching jobs found' });
    }

    // Get scores from AI utility
    const scores = await scoreJobs(jobs, preferences?.skills || req.body.skills || []);

    // Attach scores to jobs and sort by score
    const scoredJobs = jobs.map((job, index) => ({
      ...job.toObject(),
      score: scores[index],
    })).sort((a, b) => b.score - a.score);

    // Emit notification to user
    const notification = {
      userId: req.user._id,
      message: 'New jobs matched based on your preferences!',
    };
    io.emit('notification', notification);

    res.status(200).json({ message: 'Jobs matched', jobs: scoredJobs });
  } catch (error) {
    res.status(500).json({ message: 'Error finding or scoring jobs', error });
  }
};
exports.searchJobs = async (req, res) => {
  try {
    const { jobType, location, minSalary, maxSalary, skills, experienceLevel } = req.query;

    const query = {};

    if (jobType) query.jobType = jobType;
    if (location) query.location = location;
    if (experienceLevel) query.experienceLevel = experienceLevel;

    if (minSalary || maxSalary) {
      query.salary = {
        ...(minSalary && { $gte: parseInt(minSalary) }),
        ...(maxSalary && { $lte: parseInt(maxSalary) }),
      };
    }

    if (skills) {
      const skillArray = skills.split(','); // Assuming skills are sent as comma-separated values
      query.skills = { $in: skillArray };
    }
    // Default values for pagination
    const pageNum = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNum - 1) * pageSize;

    // Sorting: Default to "postedDate" in descending order
    const sortOptions = {};
    if (sortBy) sortOptions[sortBy] = order === 'asc' ? 1 : -1;
    
    const jobs = await Job.find(query)

    .sort(sortOptions)
    .skip(skip)
    .limit(pageSize);

    const totalJobs = await Job.countDocuments(query);

    if (!jobs.length) {
      return res.status(404).json({ message: 'No jobs found' });
    }

    res.status(200).json({ 
      message: 'Jobs found', 
      jobs,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalJobs / pageSize),
        totalJobs
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error searching jobs', error });
  }
};

exports.getUserJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}); // Customize this to only fetch jobs the user is interested in
    if (!jobs.length) {
      return res.status(404).json({ message: 'No jobs found' });
    }
    return jobs;
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
};
