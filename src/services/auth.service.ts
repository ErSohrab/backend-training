import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import supabase from "../config/supabase";

const generateUserId = (role: string): string => {
  const prefix = role === "admin" ? "admin" : "user";
  const randomNumber = Math.floor(Math.random() * 1000000);
  return `${prefix}-${randomNumber}`;
};

const registerUser = async (name: string, email: string, password: string, role: string = "user"): Promise<any> => {
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

const loginUser = async (email: string, password: string): Promise<{ token: string; user: any }> => {
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
    { expiresIn: (process.env.JWT_EXPIRES_IN as string) || "24h" } as jwt.SignOptions
  );

  const { password: _, ...userResponse } = user;

  return {
    token,
    user: userResponse,
  };
};

const getUserProfile = async (userId: string): Promise<{ id: string; name: string; email: string; role: string }> => {
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

export {
  registerUser,
  loginUser,
  getUserProfile,
};
