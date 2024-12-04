const express = require("express");
const Resume = require("../models/Resume");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Access denied");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user;
    next();
  });
};

// Create a resume
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, sections } = req.body;
    const resume = new Resume({ userId: req.user.id, title, sections });
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all resumes for a user
router.get("/", verifyToken, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.id });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
