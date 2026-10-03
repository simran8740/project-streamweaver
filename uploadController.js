const path = require("path");
const fs = require("fs");
const Papa = require("papaparse");
const Dataset = require("../Models/Dataset");

// ================= UPLOAD DATASET =================

const uploadDataset = async (req, res) => {
  try {
    // Check file
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a CSV or JSON file",
      });
    }

    const file = req.file;

    // Get extension
    const extension = path.extname(file.originalname).toLowerCase();

    let fileType;

    if (extension === ".csv") {
      fileType = "csv";
    } else if (extension === ".json") {
      fileType = "json";
    } else {
      return res.status(400).json({
        message: "Only CSV and JSON files are allowed",
      });
    }

    // ============================================
    // CSV FILE PROCESSING
    // ============================================

    let rowCount = 0;
    let columns = [];

    if (fileType === "csv") {
      const csvData = fs.readFileSync(file.path, "utf8");

      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
      });

      // Get column names
      if (parsedData.meta.fields) {
        columns = parsedData.meta.fields;
      }

      // Get row count
      rowCount = parsedData.data.length;
    }

    // ============================================
    // SAVE DATASET IN MONGODB
    // ============================================
const dataset = await Dataset.create({
  user: req.user.userId,
  fileName: file.originalname,
  fileType: fileType,
  fileSize: file.size,

  // Uploaded file ka actual path
  filePath: file.path,

  rowCount: rowCount,
  columns: columns,
  status: "completed",
});

    // ============================================
    // RESPONSE
    // ============================================

    res.status(201).json({
      message: "File uploaded and processed successfully",

      dataset: {
        id: dataset._id,
        fileName: dataset.fileName,
        fileType: dataset.fileType,
        fileSize: dataset.fileSize,
        rowCount: dataset.rowCount,
        columns: dataset.columns,
        status: dataset.status,
      },
    });

  } catch (error) {
    console.error("Upload Error:", error);

    res.status(500).json({
      message: "File upload failed",
    });
  }
};

module.exports = {
  uploadDataset,
};