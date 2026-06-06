const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { uploadResume, saveAnalysis, getAnalyses } = require("../controllers/resumeController");
const { protect } = require("../middleware/authMiddleware");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Disk storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// File validation
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Wrapper to handle Multer errors
const uploadMiddleware = (req, res, next) => {
  upload.single("resume")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ status: "error", message: err.message });
    } else if (err) {
      return res.status(400).json({ status: "error", message: err.message });
    }
    next();
  });
};

// POST route for uploading and analyzing resume
router.post("/upload", protect, uploadMiddleware, uploadResume);

// POST route to explicitly save a generated analysis
router.post("/save", protect, saveAnalysis);

// GET route to fetch all past analyses
router.get("/", protect, getAnalyses);

module.exports = router;
