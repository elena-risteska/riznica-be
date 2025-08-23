import express from "express";
import {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/locationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getLocations); // Public: get all
router.get("/:id", getLocationById); // Public: get one
router.post("/", protect, createLocation); // Protected
router.put("/:id", protect, updateLocation); // Protected
router.delete("/:id", protect, deleteLocation); // Protected

export default router;
