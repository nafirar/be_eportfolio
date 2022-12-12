const mongoose = require("mongoose");
const router = require("express").Router();

const ArticleSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      max: 80,
    },
    desc: {
      type: String,
      required: true,
      max: 3000,
    },
    coverArticle: {
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
module.exports = mongoose.model("Article", ArticleSchema);
