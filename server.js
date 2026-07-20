// server.js

require("dotenv").config();

const app = require("./src/app");
const { connectDB } = require("./src/config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Connect to database
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();