import express from "express";
import {
  getProfile,
  updateProfile,
  getAllUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public (for testing only)
router.get("/all", getAllUsers);

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
