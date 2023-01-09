const mongoose = require("mongoose");

const BadgeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    imgBadge: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      max: 80,
    },
    issuer: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    earnedDate: {
      type: Date,
      required: true,
    },
    desc: {
      type: String,
      required: true,
      max: 500,
    },
    skills: [
      {
        type: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Badge", BadgeSchema);
