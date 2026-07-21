const User = require("../models/user.model");

async function getSingleUser() {
  const user = User.data;

  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return {
    id: user.id ?? 1,
    name: user.name,
    role: user.role,
    department: user.department,
  };
}

module.exports = {
  getSingleUser,
};
