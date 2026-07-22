require("dotenv").config();
const supabase = require("./src/config/supabase");

const app = require("./src/app");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const { data, error } = await supabase
  .from("users") // Replace with one of your real tables
  .select("*")
  .limit(1);
    
    if (error && error.code !== "PGRST116") {
      console.warn("Supabase connection warning:", error.message);
    } else {
      console.log("Supabase client initialized successfully");
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
