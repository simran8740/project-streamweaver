const Dataset = require("../Models/Dataset");

// ================= CREATE DATASET =================

const createDataset = async (req, res) => {
  try {
    const {
      fileName,
      fileType,
      fileSize,
      rowCount,
      columns,
    } = req.body;

    if (!fileName || !fileType) {
      return res.status(400).json({
        message: "File name and file type are required",
      });
    }

    const dataset = await Dataset.create({
      user: req.user.userId,
      fileName,
      fileType,
      fileSize: fileSize || 0,
      rowCount: rowCount || 0,
      columns: columns || [],
    });

    res.status(201).json({
      message: "Dataset created successfully",
      dataset,
    });
  } catch (error) {
    console.error("Create Dataset Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= GET ALL DATASETS =================

const getDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      datasets,
    });
  } catch (error) {
    console.error("Get Datasets Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= GET SINGLE DATASET =================

const getDatasetById = async (req, res) => {
  try {
    const dataset = await Dataset.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!dataset) {
      return res.status(404).json({
        message: "Dataset not found",
      });
    }

    res.status(200).json({
      dataset,
    });
  } catch (error) {
    console.error("Get Dataset Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= DELETE DATASET =================

const deleteDataset = async (req, res) => {
  try {
    const dataset = await Dataset.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!dataset) {
      return res.status(404).json({
        message: "Dataset not found",
      });
    }

    res.status(200).json({
      message: "Dataset deleted successfully",
    });
  } catch (error) {
    console.error("Delete Dataset Error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createDataset,
  getDatasets,
  getDatasetById,
  deleteDataset,
};