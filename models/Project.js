const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
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
    isPublic: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    participants: [
      {
        type: String,
      },
    ],
    requests: [
      {
        type: String,
      },
    ],
    roadmaps: [
      {
        title: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        desc: {
          type: String,
          max: 500,
        },
        tasks: [
          {
            title: {
              type: String,
              required: true,
            },
            date: {
              type: Date,
            },
            desc: {
              type: String,
              max: 500,
            },
            status: {
              type: String,
              enum: ["prepare", "todo", "inprogress", "complete"],
            },
            images: [
              {
                id: {
                  type: Number,
                },
                name: {
                  type: String,
                },
                imgurl: {
                  type: String,
                },
              },
            ],
            todos: [
              {
                title: {
                  type: String,
                  required: true,
                },
                done: {
                  type: Boolean,
                },
                report: {
                  type: String,
                },
                assignee: [
                  {
                    type: String,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
