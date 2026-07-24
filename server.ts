import dotenv from "dotenv";
import supabase from "./src/config/supabase";
import app from "./src/app";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer(): Promise<void> {
  try {
    const { data, error } = await supabase
      .from("users")
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
