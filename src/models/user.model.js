const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      default: 1,
      min: 1,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      default: "Intern",
    },
    department: {
      type: String,
      required: true,
      default: "Backend Training",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
