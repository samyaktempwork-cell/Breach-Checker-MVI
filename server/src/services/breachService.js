import axios from "axios";
import { FEATURE_FLAGS } from "../config/featureFlags.js";

export async function checkNumberBreach(mobile, country) {
  const clean = mobile.replace(/\D/g, "");

  let metadata = {
    country: "Unknown",
    location: "Unknown",
    carrier: "Unknown",
    line_type: "Unknown",
  };

  let valid = false;

  // -------------------------------
  // NUMVERIFY (toggle ON/OFF)
  // -------------------------------
  if (FEATURE_FLAGS.USE_NUMVERIFY) {
    try {
      const url = `http://apilayer.net/api/validate?access_key=${process.env.NUMVERIFY_KEY}&number=${clean}&country_code=${country}&format=1`;
      const response = await axios.get(url);
      const data = response.data;

      valid = data.valid || false;

      metadata = {
        country: data.country_name || "Unknown",
        location: data.location || "Unknown",
        carrier: data.carrier || "Unknown",
        line_type: data.line_type || "Unknown",
      };

    } catch (err) {
      console.error("NumVerify error:", err.message);
    }
  } else {
    console.log("NumVerify DISABLED — returning fallback metadata.");
  }

  // -------------------------------
  // OSINT Placeholder (toggle ON/OFF)
  // -------------------------------
  let osint = null;

  if (FEATURE_FLAGS.USE_OSINT) {
    osint = {
      info: "PhoneInfoga not installed. Placeholder OSINT result.",
      timestamp: new Date().toISOString(),
    };
  }

  // -------------------------------
  // PHONEINFOGA (off until later)
  // -------------------------------
  if (FEATURE_FLAGS.USE_PHONEINFOGA) {
    // (We will integrate Docker-based PhoneInfoga later)
  }

  return {
    mobile,
    valid,
    metadata,
    breached: false,
    osint,
    flags_used: FEATURE_FLAGS // helpful for debugging
  };
}
