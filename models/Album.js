const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    filesize: {
      type: Number,
      required: true,
    },
    fileAlbum: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["image", "video", "document"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Album", AlbumSchema);
