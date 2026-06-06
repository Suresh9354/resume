const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false // Optional for now since auth isn't fully set up globally yet
  },
  fileUrl: {
    type: String,
    required: true
  },
  extractedText: {
    type: String,
  },
  skills: {
    type: [String],
    default: []
  },
  score: {
    type: Number,
    default: 0
  },
  suggestions: {
    type: [String],
    default: []
  },
  jobRole: {
    type: String,
    default: "Unspecified"
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model("Analysis", AnalysisSchema);
