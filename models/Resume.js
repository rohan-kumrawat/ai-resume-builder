const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  sections: { type: Object, default: {} },
});

module.exports = mongoose.model("Resume", ResumeSchema);
