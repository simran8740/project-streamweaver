const mongoose = require("mongoose");

const datasetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    fileType: {
      type: String,
      enum: ["csv", "json"],
      required: true,
    },

    fileSize: {
      type: Number,
      default: 0,
    },
     filePath: {
  type: String,
  required: true,
},
    rowCount: {
      type: Number,
      default: 0,
    },

    columns: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["uploaded", "processing", "completed", "failed"],
      default: "uploaded",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Dataset", datasetSchema);