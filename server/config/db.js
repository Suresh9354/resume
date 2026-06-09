const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/resume-analyzer";
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB (${uri}): ${error.message}`);
    
    // Fallback to local MongoDB if primary URI fails
    if (uri !== "mongodb://127.0.0.1:27017/resume-analyzer") {
      console.log("Attempting fallback to local MongoDB (mongodb://127.0.0.1:27017/resume-analyzer)...");
      try {
        const localConn = await mongoose.connect("mongodb://127.0.0.1:27017/resume-analyzer");
        console.log(`MongoDB Connected (Local Fallback): ${localConn.connection.host}`);
        return;
      } catch (localError) {
        console.error(`Failed to connect to local MongoDB: ${localError.message}`);
      }
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;
