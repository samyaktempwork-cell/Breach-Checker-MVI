export const FEATURE_FLAGS = {
  USE_NUMVERIFY: process.env.USE_NUMVERIFY === "true",
  USE_PHONEINFOGA: process.env.USE_PHONEINFOGA === "true",
  USE_OSINT: process.env.USE_OSINT === "true",
  USE_MONGO_HISTORY: process.env.USE_MONGO_HISTORY === "true",
  USE_EMAIL_BREACH: process.env.USE_EMAIL_BREACH === "true",
};
