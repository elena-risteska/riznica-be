import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Location from "../models/Location.js";

/* ===== Profile ===== */

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// @desc    Update current user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  const { firstName, lastName, username, bio, profilePic } = req.body;

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (username) user.username = username;
  if (bio) user.bio = bio;
  if (profilePic) user.profilePic = profilePic;

  const updatedUser = await user.save();
  res.json(updatedUser);
});

// @desc    Delete current user account
// @route   DELETE /api/users/profile
// @access  Private
export const deleteProfile = asyncHandler(async (req, res) => {
  await req.user.deleteOne();
  res.json({ message: "User deleted successfully" });
});

/* ===== Favorites ===== */

// @desc    Add a location to favorites
// @route   POST /api/users/favorites/:locationId
// @access  Private
export const addFavorite = asyncHandler(async (req, res) => {
  const user = req.user;
  const { locationId } = req.params;

  const location = await Location.findById(locationId);
  if (!location) {
    res.status(404);
    throw new Error("Location not found");
  }

  if (user.favorites.includes(locationId)) {
    res.status(400);
    throw new Error("Location already in favorites");
  }

  user.favorites.push(locationId);
  await user.save();

  res.json({ message: "Added to favorites", favorites: user.favorites });
});

// @desc    Remove a location from favorites
// @route   DELETE /api/users/favorites/:locationId
// @access  Private
export const removeFavorite = asyncHandler(async (req, res) => {
  const user = req.user;
  const { locationId } = req.params;

  user.favorites = user.favorites.filter(
    (favId) => favId.toString() !== locationId
  );
  await user.save();

  res.json({ message: "Removed from favorites", favorites: user.favorites });
});

// @desc    Get all favorites of the current user
// @route   GET /api/users/favorites
// @access  Private
export const getFavorites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("favorites");
  res.json(user.favorites);
});
