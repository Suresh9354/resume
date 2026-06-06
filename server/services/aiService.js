const { GoogleGenAI } = require("@google/genai");

const analyzeResume = async (resumeText) => {
  // Utilizing standard Google General AI Client Architecture bindings
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are an advanced ATS (Applicant Tracking System) and career expert.

Analyze the given resume in 3 steps and return STRICT JSON only:

{
  "jobRole": "",
  "atsScore": number,
  "matchingSkills": [],
  "suggestions": []
}

Instructions:

1. Identify the most suitable Job Role based on the resume content (e.g., Frontend Developer, Backend Developer, Data Analyst, etc.)

2. Calculate ATS Compatibility Score (0–100) based on:
- Skills relevance
- Keyword usage
- Resume structure
- Experience/projects

3. Extract matching skills relevant to the identified job role

4. Provide short and actionable suggestions (max 3–5 points only):
- Keep suggestions concise
- Focus on missing skills, improvements, or keywords

Rules:
- Output must be STRICT JSON (no explanation)
- Keep suggestions short and clear
- Use modern industry skills for comparison

Resume:
"""
${resumeText}
"""
`;

  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
              responseMimeType: "application/json",
              temperature: 0.2, // enforce deterministic accuracy parsing 
          }
      });

      let resultText = response.text;
      
      // Strip markdown formatting if Gemini wrapped the JSON response
      resultText = resultText.replace(/```(?:\s*json)?\n?/gi, "").replace(/```/g, "").trim();
      
      const parsedData = JSON.parse(resultText);
      
      // Map the new JSON structure to the application's expected properties
      return {
        score: parsedData.atsScore || 0,
        skills: parsedData.matchingSkills || [],
        missingSkills: [], 
        suggestions: parsedData.suggestions || [],
        jobRole: parsedData.jobRole || "Unspecified",
        strengths: [],
        weaknesses: []
      };
    } catch (error) {
      console.error(`Gemini Analysis Error (Attempt ${attempt + 1}/${maxRetries}):`, error);
      
      // Detailed error breakdown
      if (error.name === 'SyntaxError') {
         throw new Error("AI generated an invalid format. Please try again.");
      }
      
      // If the error is an HTTP 503 (Service Unavailable/Model Overloaded)
      if (error.status === 503 || (error.message && error.message.includes("503"))) {
        attempt++;
        if (attempt >= maxRetries) {
          throw new Error("Google AI servers are currently overloaded. Please try again in a few moments.");
        }
        // Wait 2 seconds before retrying
        await new Promise(resolve => setTimeout(resolve, 2000));
        continue;
      }
      
      // For any other terminal error
      throw new Error(`AI processing failed: ${error.message}`);
    }
  }
};

module.exports = { analyzeResume };
