import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler.js";

// Helper: generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register
export const register = asyncHandler(async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(
      errors
        .array()
        .map((e) => e.msg)
        .join(", ")
    );
  }

  const { firstName, lastName, username, email, password, bio, profilePic } =
    req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("Email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
    bio,
    profilePic,
    role: "user", // default role
  });

  await newUser.save();

  // Return response
  res.status(201).json({
    user: {
      id: newUser._id,
      firstName,
      lastName,
      username,
      email,
      bio,
      profilePic,
      role: newUser.role,
    },
    token: generateToken(newUser._id),
  });
});

// Login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  res.json({
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePic: user.profilePic,
      role: user.role,
    },
    token: generateToken(user._id),
  });
});
