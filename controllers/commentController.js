import asyncHandler from "express-async-handler";
import Comment from "../models/Comment.js";
import Location from "../models/Location.js";

export const addComment = asyncHandler(async (req, res) => {
  const { locationId } = req.params;
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error("Comment text is required");
  }

  const location = await Location.findById(locationId);
  if (!location) {
    res.status(404);
    throw new Error("Location not found");
  }

  const comment = await Comment.create({
    user: req.user._id,
    location: locationId,
    text,
  });

  res.status(201).json(comment);
});

export const getCommentsByLocation = asyncHandler(async (req, res) => {
  const { locationId } = req.params;

  const comments = await Comment.find({ location: locationId })
    .populate("user", "firstName lastName username")
    .sort({ createdAt: -1 });

  res.json(comments);
});

export const getCommentById = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId).populate(
    "user",
    "firstName lastName username"
  );

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  res.json(comment);
});

export const updateComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const comment = await Comment.findById(req.params.commentId);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if (comment.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to edit this comment");
  }

  comment.text = text || comment.text;
  const updatedComment = await comment.save();

  res.json(updatedComment);
});

export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);

  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  if (comment.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this comment");
  }

  await comment.deleteOne();
  res.json({ message: "Comment deleted successfully" });
});

export const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find()
    .populate("user", "firstName lastName username")
    .populate("location", "name city");
  res.json(comments);
});
