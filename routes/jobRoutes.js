const express = require("express");
const axios = require("axios");

const router = express.Router();

// Get job listings by skill
router.get("/jobs", async (req, res) => {
  try {
    const { skill } = req.query;
    if (!skill) return res.status(400).json({ error: "Skill is required" });

    // Replace with a real API call
    const jobListings = [
      { title: "Frontend Developer", company: "TechCorp", location: "Remote" },
      { title: "React Developer", company: "Innovate LLC", location: "San Francisco" },
    ];

    res.status(200).json(jobListings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

module.exports = router;
