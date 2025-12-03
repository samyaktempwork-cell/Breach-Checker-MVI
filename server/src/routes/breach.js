import express from "express";
import { checkNumberBreach } from "../services/breachService.js";

const router = express.Router();

router.post("/check", async (req, res) => {
  const { mobileNumber, countryCode } = req.body;

  console.log("Received:", mobileNumber, countryCode);

  if (!mobileNumber || !countryCode) {
    return res.status(400).json({ error: "Mobile number and country code required" });
  }

  const result = await checkNumberBreach(mobileNumber, countryCode);
  res.json(result);
});

export default router;
