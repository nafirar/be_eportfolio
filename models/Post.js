const mongoose = require("mongoose");
//const {ObjectId} = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      max: 500,
    },
    img: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    comments: [
      {
        userId: {
          type: mongoose.Schema.ObjectId,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
