const mongoose = require("mongoose");

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
    mermaidDiagram: {
      type: String,
    },
    coverArticle: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tags: [
      {
        type: String,
      },
    ],
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
