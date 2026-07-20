
// src/config/db.js
const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connected successfully.");
    }
    catch (error) {
            console.error("Database connection failed.");
            console.error(error.message);

            process.exit(1);
        }
}

module.exports =  { 
    connectDB 
};