import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, },
    description: { type: String, required: true, minlength: 10, },
    price: { type: Number, required: true, },
    category: { type: String, required: true },
    condition: { type: String, enum: ["new", "used"], default: "used", },
    images: { type: [String], default: [], },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true, },
    status: { type: String, enum: ["available", "sold"], default: "available", },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
