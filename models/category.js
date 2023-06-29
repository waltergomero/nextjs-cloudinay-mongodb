import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category_name: { type: String, required: true, unique: true },
    parent_category_id: { type: String, required: false },
    status_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Status",
      required: true,
    },
    status_name: { type: String, required: true },
    notes: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
