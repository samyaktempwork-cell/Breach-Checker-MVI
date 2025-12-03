import axios from "axios";
import { FEATURE_FLAGS } from "../config/featureFlags.js";
import EmailHistory from "../models/EmailHistory.js";
import { sleep } from "../utils/sleep.js";

export async function checkEmailBreach(email) {
  const out = {
    email,
    hibp: null,
    error: false,
    flags_used: FEATURE_FLAGS
  };

  if (!email || typeof email !== "string") {
    return { ...out, error: { message: "Invalid email" } };
  }

  // If disabled → return default safe result
  if (!FEATURE_FLAGS.USE_EMAIL_BREACH) {
    out.hibp = {
      breached: false,
      breaches: [],
      note: "Email breach scanning disabled by feature flag"
    };
    return out;
  }

  try {
    // HIBP limit: 1 request per 1500ms
    await sleep(1600);

    const url = `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(
      email
    )}?truncateResponse=false`;

    const res = await axios.get(url, {
      headers: {
        "hibp-api-key": process.env.HIBP_API_KEY || "",
        "User-Agent": "breach-checker/1.0 (email module)"
      },
      timeout: 15000
    });

    const breaches = Array.isArray(res.data) ? res.data : [];

    out.hibp = {
      breached: breaches.length > 0,
      breaches: breaches.map(b => ({
        Name: b.Name,
        Title: b.Title,
        Domain: b.Domain,
        BreachDate: b.BreachDate,
        AddedDate: b.AddedDate,
        DataClasses: b.DataClasses,
        Description: b.Description
      }))
    };

    // Save history if enabled
    if (FEATURE_FLAGS.USE_MONGO_HISTORY) {
      await EmailHistory.create({
        email,
        breached: out.hibp.breached,
        breaches: out.hibp.breaches
      });
    }

    return out;

  } catch (err) {
    // HIBP returns 404 = no breach
    if (err.response && err.response.status === 404) {
      out.hibp = {
        breached: false,
        breaches: []
      };
      return out;
    }

    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      return { ...out, error: { message: "HIBP API key missing or invalid" } };
    }

    return { ...out, error: { message: err.message } };
  }
}
