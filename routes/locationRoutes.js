import express from "express";
import {
  getLocations,
  getLocationById,
  createLocation,
} from "../controllers/locationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getLocations); // Public: get all
router.get("/:id", getLocationById); // Public: get one
router.post("/", protect, createLocation); // Protected: only logged in users

export default router;
