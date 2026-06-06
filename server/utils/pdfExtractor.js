const fs = require("fs").promises;
const pdfParse = require("pdf-parse");

/**
 * Extracts raw text from a PDF file located at the specified file path.
 * 
 * @param {string} filePath - Absolute or relative path to the scanned PDF.
 * @returns {Promise<string>} The parsed text data.
 */
const extractTextFromPDF = async (filePath) => {
  try {
    const fileBuffer = await fs.readFile(filePath);
    const data = await pdfParse(fileBuffer);
    
    // Safety check just in case the PDF text layer is strangely inaccessible
    if (!data.text) {
      throw new Error("Parsed PDF but no text was found.");
    }
    
    return data.text;
  } catch (error) {
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
};

module.exports = {
  extractTextFromPDF,
};
