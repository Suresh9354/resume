const { test } = require("node:test");
const assert = require("node:assert/strict");
const Analysis = require("../models/Analysis");

test("Analysis model stores upload fields including jobRole", () => {
  const analysis = new Analysis({
    userId: "507f1f77bcf86cd799439011",
    fileUrl: "uploads/resume-123.pdf",
    extractedText: "Jane Doe\nSoftware Engineer",
    skills: ["JavaScript", "React"],
    score: 82,
    suggestions: ["Add measurable impact"],
    jobRole: "Frontend Developer",
  });

  assert.equal(analysis.userId, "507f1f77bcf86cd799439011");
  assert.equal(analysis.jobRole, "Frontend Developer");
  assert.deepEqual(analysis.skills, ["JavaScript", "React"]);
  assert.equal(analysis.score, 82);
});
