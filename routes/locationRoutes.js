import express from "express";
import {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/locationController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { upload } from "../cloudinary.js";

const router = express.Router();

// Public routes
router.get("/", getLocations);
router.get("/:id", getLocationById);

// Admin-only routes
router.post("/", protect, isAdmin, upload.array("images", 5), createLocation);
router.put("/:id", protect, isAdmin, updateLocation);
router.delete("/:id", protect, isAdmin, deleteLocation);

export default router;
