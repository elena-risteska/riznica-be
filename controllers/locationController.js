import Location from "../models/Location.js";

// Get all locations (with optional search by title)
export const getLocations = async (req, res) => {
  const { title } = req.query; // 👈 support ?title= query param

  try {
    let query = {};
    if (title) {
      query.title = { $regex: title, $options: "i" }; // case-insensitive match
    }

    const locations = await Location.find(query);
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single location by ID
export const getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location)
      return res.status(404).json({ message: "Location not found" });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new location
export const createLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    const savedLocation = await location.save();
    res.status(201).json(savedLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update location
export const updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!location)
      return res.status(404).json({ message: "Location not found" });
    res.json(location);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete location
export const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location)
      return res.status(404).json({ message: "Location not found" });
    res.json({ message: "Location removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
