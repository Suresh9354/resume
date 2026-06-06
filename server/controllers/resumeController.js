const { extractTextFromPDF } = require("../utils/pdfExtractor");
const { analyzeResume } = require("../services/aiService");
const Analysis = require("../models/Analysis");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: "error", message: "No file uploaded" });
    }

    // Read the file and extract text using utility module
    const resumeText = await extractTextFromPDF(req.file.path);
    
    // De-couple extraction parameters securely delegating LLM payloads upstream logically
    const aiAnalysis = await analyzeResume(resumeText);

    // Default string fallback
    aiAnalysis.feedback = aiAnalysis.score >= 50 ? "Good baseline of skills detected!" : "Critically missing core technical proficiencies.";

    const savedAnalysis = await Analysis.create({
      userId: req.user.id,
      fileUrl: req.file.path,
      extractedText: resumeText,
      skills: aiAnalysis.skills,
      score: aiAnalysis.score,
      suggestions: aiAnalysis.suggestions,
      jobRole: aiAnalysis.jobRole,
    });

    res.status(200).json({
      status: "success",
      message: "Resume uploaded and processed successfully",
      filePath: req.file.path,
      extractedTextLength: resumeText.length,
      extractedText: resumeText,
      analysis: aiAnalysis,
      analysisId: savedAnalysis._id,
    });
  } catch (error) {
    console.error("Error during PDF processing:", error);
    res.status(500).json({ status: "error", message: error.message || "Failed to process resume" });
  }
};

const saveAnalysis = async (req, res) => {
  try {
    const { fileUrl, extractedText, skills, score, suggestions, jobRole } = req.body;
    
    const newAnalysis = new Analysis({ 
      userId: req.user.id, 
      fileUrl, 
      extractedText, 
      skills, 
      score, 
      suggestions,
      jobRole,
    });
    
    const saved = await newAnalysis.save();
    res.status(201).json({ status: "success", message: "Analysis saved to database", data: saved });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Failed to save analysis: " + err.message });
  }
};

const getAnalyses = async (req, res) => {
  try {
    // Reverse chronological order explicitly scoped to authenticated User
    const records = await Analysis.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data: records });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Failed to fetch analyses: " + err.message });
  }
};

module.exports = {
  uploadResume,
  saveAnalysis,
  getAnalyses,
};
