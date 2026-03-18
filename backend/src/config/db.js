const mongoose = require("mongoose");

const connectDB = async () => {
  let retries = 10;
  while (retries) {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("✅ MongoDB connected successfully!");
      break;
    } catch (err) {
      retries--;
      console.log(`⏳ MongoDB not ready, ${retries} attempts remaining...`);
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
  if (!retries) {
    console.error("❌ Failed to connect to MongoDB! Exiting...");
    process.exit(1);
  }
};

module.exports = connectDB;
