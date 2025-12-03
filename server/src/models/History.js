import mongoose from "mongoose";

const EmailHistorySchema = new mongoose.Schema({
  email: String,
  breached: Boolean,
  breaches: Array,
  checkedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("EmailHistory", EmailHistorySchema);
