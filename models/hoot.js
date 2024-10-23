const mongoose = require("mongoose");
const Hoot = mongoose.mode("Hoot", hootSchema);

const hootSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["News", "Sports", "Games", "Movies", "Music", "Television"],
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [commentSchema],
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = Hoot;
