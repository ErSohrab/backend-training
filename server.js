require("dotenv").config();

const app = require("./src/app");

const PORT = process.env.PORT || 5000;

function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
