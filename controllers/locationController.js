import Location from "../models/Location.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get all locations (with optional search by title)
export const getLocations = asyncHandler(async (req, res) => {
  const { title } = req.query;
  let query = {};
  if (title) {
    query.title = { $regex: title, $options: "i" }; // case-insensitive
  }

  const locations = await Location.find(query);
  res.json(locations);
});

export const getLocationById = asyncHandler(async (req, res) => {
  const location = await Location.findById(req.params.id);
  if (!location) {
    res.status(404);
    throw new Error("Location not found");
  }
  res.json(location);
});

export const createLocation = asyncHandler(async (req, res) => {
  const location = new Location(req.body);
  const savedLocation = await location.save();
  res.status(201).json(savedLocation);
});

export const updateLocation = asyncHandler(async (req, res) => {
  const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!location) {
    res.status(404);
    throw new Error("Location not found");
  }
  res.json(location);
});

export const deleteLocation = asyncHandler(async (req, res) => {
  const location = await Location.findByIdAndDelete(req.params.id);
  if (!location) {
    res.status(404);
    throw new Error("Location not found");
  }
  res.json({ message: "Location removed" });
});
