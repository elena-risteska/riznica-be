import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  mainInfo: { type: String, required: true },
  directions: { type: String, required: true },
  region: { type: String, required: true },
  hiking: { type: String, required: true },
  biking: { type: String, required: true },
  legend: { type: String, required: true },
  images: [String],
  place: { type: String, required: true },
  details: {
    type: [String],
  },
  coords: {
    type: [Number],
  },
  activities: {
    type: [String],
  },
  type: {
    type: String,
    required: true,
    enum: [
      "waterfall",
      "archeology",
      "cave",
      "canyon",
      "landmark",
      "lake",
      "rarity",
    ],
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Location", locationSchema);
