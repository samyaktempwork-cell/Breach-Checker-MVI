import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema({
  mobileNumber: String,
  breached: Boolean,
  breaches: Array,
  checkedAt: { type: Date, default: Date.now }
});

export default mongoose.model("History", HistorySchema);
