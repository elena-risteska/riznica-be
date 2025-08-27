import express from "express";
import {
  getProfile,
  updateProfile,
  deleteProfile,
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ===== Profile ===== */
// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get("/profile", protect, getProfile);

// @route   PUT /api/users/profile
// @desc    Update current user profile
// @access  Private
router.put("/profile", protect, updateProfile);

// @route   DELETE /api/users/profile
// @desc    Delete current user profile
// @access  Private
router.delete("/profile", protect, deleteProfile);

/* ===== Favorites ===== */
// @route   GET /api/users/favorites
// @desc    Get all favorites
// @access  Private
router.get("/favorites", protect, getFavorites);

// @route   POST /api/users/favorites/:locationId
// @desc    Add location to favorites
// @access  Private
router.post("/favorites/:locationId", protect, addFavorite);

// @route   DELETE /api/users/favorites/:locationId
// @desc    Remove location from favorites
// @access  Private
router.delete("/favorites/:locationId", protect, removeFavorite);

export default router;
