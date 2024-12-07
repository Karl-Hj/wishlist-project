import mongoose from "mongoose";

const wish = new mongoose.Schema({
  userName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  webpage: { type: String },
  image: { type: String },
});

const wishItem = mongoose.model("wishItem", wish);

export default wishItem;
