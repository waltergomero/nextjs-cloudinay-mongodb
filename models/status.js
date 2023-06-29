import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    status_name: { type: String, required: true },
    status_typeid: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Status = mongoose.models.Status || mongoose.model("Status", statusSchema);
export default Status;
