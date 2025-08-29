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

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.delete("/profile", protect, deleteProfile);

router.get("/favorites", protect, getFavorites);
router.post("/favorites/:locationId", protect, addFavorite);
router.delete("/favorites/:locationId", protect, removeFavorite);

export default router;
