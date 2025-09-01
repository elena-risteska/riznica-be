import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  place: { type: String, required: true },
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
