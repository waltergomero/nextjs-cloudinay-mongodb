import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    image_name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: false },
    islandscape: { type: Boolean, required: true },
    title: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    category_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    category_name: { type: String, required: true },
    user_id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Gallery =
  mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);
export default Gallery;
