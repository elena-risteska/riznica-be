import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addComment,
  getCommentsByLocation,
  getCommentById,
  updateComment,
  deleteComment,
  getAllComments,
} from "../controllers/commentController.js";

const router = express.Router();

// Create & Read (location-specific)
router.post("/:locationId", protect, addComment);
router.get("/:locationId", getCommentsByLocation);

// Single comment CRUD
router.get("/single/:commentId", getCommentById);
router.put("/:commentId", protect, updateComment);
router.delete("/:commentId", protect, deleteComment);

// Admin/debug route
router.get("/", getAllComments);

export default router;
