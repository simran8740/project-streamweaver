const fs = require("fs");
const Papa = require("papaparse");
const Dataset = require("../Models/Dataset");

// ================= PREVIEW DATASET =================

const previewDataset = async (req, res) => {
  try {
    // Dataset ID URL se milegi
    const dataset = await Dataset.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    // Dataset nahi mila
    if (!dataset) {
      return res.status(404).json({
        message: "Dataset not found",
      });
    }

    // File path check
    if (!dataset.filePath) {
      return res.status(404).json({
        message: "File path not found",
      });
    }

    // Check whether file exists
    if (!fs.existsSync(dataset.filePath)) {
      return res.status(404).json({
        message: "Uploaded file not found",
      });
    }

    // Read CSV file
    const csvData = fs.readFileSync(dataset.filePath, "utf8");

    // Parse CSV
    const parsedData = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    // Send data to frontend
    res.status(200).json({
      message: "Dataset preview fetched successfully",

      dataset: {
        id: dataset._id,
        fileName: dataset.fileName,
        fileType: dataset.fileType,
        fileSize: dataset.fileSize,
        rowCount: parsedData.data.length,
        columns: parsedData.meta.fields || [],
      },

      data: parsedData.data,
    });

  } catch (error) {
    console.error("Preview Error:", error);

    res.status(500).json({
      message: "Unable to preview dataset",
    });
  }
};

module.exports = {
  previewDataset,
};