const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");

const generateUserId = (role) => {
  const prefix = role === "admin" ? "admin" : "user";
  const randomNumber = Math.floor(Math.random() * 1000000);
  return `${prefix}-${randomNumber}`;
};

const registerUser = async (name, email, password, role = "user") => {
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user_id = generateUserId(role);

  const { data: newUser, error: insertError } = await supabase
    .from("users")
    .insert([
      {
        user_id,
        name,
        email,
        password: hashedPassword,
        role,
      },
    ])
    .select()
    .single();

  if (insertError) {
    throw insertError;
  }

  const { password: _, ...userResponse } = newUser;
  return userResponse;
};

const loginUser = async (email, password) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.user_id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || "your-secret-key",
    { expiresIn: "24h" }
  );

  const { password: _, ...userResponse } = user;

  return {
    token,
    user: userResponse,
  };
};

const getUserProfile = async (userId) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("user_id, name, email, role")
    .eq("user_id", userId)
    .single();

  if (error || !user) {
    throw new Error("User not found");
  }

  return {
    id: user.user_id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
