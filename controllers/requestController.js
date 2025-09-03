import asyncHandler from "express-async-handler";
import Request from "../models/Request.js";

export const createRequest = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const newRequest = new Request({ name, email, message });
  const savedRequest = await newRequest.save();

  res.status(201).json(savedRequest);
});

export const getRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find().sort({ createdAt: -1 });
  res.json(requests);
});
