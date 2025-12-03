import express from "express";
import { checkEmailBreach } from "../services/emailService.js";

const router = express.Router();

router.post("/check", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

  try {
    const result = await checkEmailBreach(email);
    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: "Email scan failed",
      details: err.message
    });
  }
});

export default router;
