import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import breachRoutes from "./routes/breach.js";
import emailRoutes from "./routes/email.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error", err));

app.use("/api/breach", breachRoutes);
app.use("/api/breach/email", emailRoutes);

app.get("/", (req, res) => res.send("Backend running"));
const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
