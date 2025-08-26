import User from "../models/User.js";
import Location from "../models/Location.js";

// Get current user profile
export const getProfile = async (req, res) => {
  res.json(req.user);
};

// Update current user profile
export const updateProfile = async (req, res) => {
  const user = req.user;
  const { firstName, lastName, username, bio, profilePic } = req.body;

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (username) user.username = username;
  if (bio) user.bio = bio;
  if (profilePic) user.profilePic = profilePic;

  try {
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete current user account
export const deleteProfile = async (req, res) => {
  try {
    await req.user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===== Favorites ===== */

// Add a location to favorites
export const addFavorite = async (req, res) => {
  const user = req.user;
  const { locationId } = req.params;

  try {
    const location = await Location.findById(locationId);
    if (!location)
      return res.status(404).json({ message: "Location not found" });

    if (user.favorites.includes(locationId))
      return res.status(400).json({ message: "Location already in favorites" });

    user.favorites.push(locationId);
    await user.save();

    res.json({ message: "Added to favorites", favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove a location from favorites
export const removeFavorite = async (req, res) => {
  const user = req.user;
  const { locationId } = req.params;

  try {
    user.favorites = user.favorites.filter(
      (favId) => favId.toString() !== locationId
    );
    await user.save();

    res.json({ message: "Removed from favorites", favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all favorites of the current user
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
