import Location from "../models/Location.js";

// Get all locations
export const getLocations = async (req, res) => {
  try {
    const locations = await Location.find().populate(
      "createdBy",
      "username email"
    );
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single location by ID
export const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id).populate(
      "createdBy",
      "username email"
    );
    if (!location)
      return res.status(404).json({ message: "Location not found" });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new location (protected route)
export const createLocation = async (req, res) => {
  const { title, description, images, city } = req.body;

  try {
    const newLocation = new Location({
      title,
      description,
      images,
      city,
      createdBy: req.user._id, // user comes from auth middleware
    });

    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
