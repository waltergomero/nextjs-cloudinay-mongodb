import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    category_name: { type: String, required: true },
    image_url: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Collection =
  mongoose.models.Collection || mongoose.model("Collection", collectionSchema);
export default Collection;
