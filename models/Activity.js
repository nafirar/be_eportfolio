const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      max: 80,
    },
    type: {
      type: String,
      enum: ["academic", "non-academic"],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    desc: {
      type: String,
      required: true,
      max: 500,
    },
    mermaidDiagram: {
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
    tasks: [
      {
        title: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
        },
        desc: {
          type: String,
          required: true,
          max: 500,
        },
        mermaidDiagram: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", ActivitySchema);
