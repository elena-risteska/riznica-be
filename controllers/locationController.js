import Location from "../models/Location.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getLocations = asyncHandler(async (req, res) => {
  const { title, activity, region } = req.query;
  let query = {};
  if (title) {
    query.title = { $regex: title, $options: "i" };
  }
  if (activity) {
    query.activities = { $in: [activity] };
  }
  if (region) {
    query.region = region;
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
  try {
    const imageUrls = req.files?.map((file) => file.path) || [];

    const details = req.body.details
      ? Array.isArray(req.body.details)
        ? req.body.details
        : [req.body.details]
      : [];

    const coords = req.body.coords
      ? Array.isArray(req.body.coords)
        ? req.body.coords.map(Number)
        : req.body.coords.split(",").map(Number)
      : [];

    const activities = req.body.activities
      ? Array.isArray(req.body.activities)
        ? req.body.activities
        : [req.body.activities]
      : [];

    const location = new Location({
      title: req.body.title,
      description: req.body.description,
      place: req.body.place,
      type: req.body.type,
      directions: req.body.directions,
      mainInfo: req.body.mainInfo,
      hiking: req.body.hiking,
      biking: req.body.biking,
      legend: req.body.legend,
      createdBy: req.user?._id,
      images: imageUrls,
      details,
      coords,
      activities,
    });

    const savedLocation = await location.save();
    res.status(201).json(savedLocation);
  } catch (err) {
    console.error("Create location error:", err);
    res
      .status(500)
      .json({ message: "Failed to create location", error: err.message });
  }
});

export const updateLocation = asyncHandler(async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      res.status(404);
      throw new Error("Location not found");
    }

    if (req.files?.length > 0) {
      const imageUrls = req.files.map((file) => file.path);
      location.images.push(...imageUrls);
    }

    if (req.body.title) location.title = req.body.title;
    if (req.body.description) location.description = req.body.description;
    if (req.body.place) location.place = req.body.place;
    if (req.body.type) location.type = req.body.type;

    if (req.body.details) {
      location.details = Array.isArray(req.body.details)
        ? req.body.details
        : [req.body.details];
    }

    if (req.body.coords) {
      location.coords = Array.isArray(req.body.coords)
        ? req.body.coords.map(Number)
        : req.body.coords.split(",").map(Number);
    }

    if (req.body.activities) {
      location.activities = Array.isArray(req.body.activities)
        ? req.body.activities
        : [req.body.activities];
    }

    const updatedLocation = await location.save();
    res.status(200).json(updatedLocation);
  } catch (err) {
    console.error("Update location error:", err);
    res
      .status(500)
      .json({ message: "Failed to update location", error: err.message });
  }
});

export const deleteLocation = asyncHandler(async (req, res) => {
  const location = await Location.findByIdAndDelete(req.params.id);
  if (!location) {
    res.status(404);
    throw new Error("Location not found");
  }
  res.json({ message: "Location removed" });
});
