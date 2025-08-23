import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/locations", locationRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Example test route
app.get("/testdb", async (req, res) => {
  try {
    // Just get database name to confirm
    const dbName = mongoose.connection.db.databaseName;
    res.json({ message: "MongoDB is working 🚀", db: dbName });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("Welcome to Riznica API 🌄");
});
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
