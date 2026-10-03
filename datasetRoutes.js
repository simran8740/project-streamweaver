const express = require("express");

const {
  createDataset,
  getDatasets,
  getDatasetById,
  deleteDataset,
} = require("../controller/datasetController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create dataset
router.post("/", protect, createDataset);

// Get all datasets
router.get("/", protect, getDatasets);

// Get single dataset
router.get("/:id", protect, getDatasetById);

// Delete dataset
router.delete("/:id", protect, deleteDataset);

module.exports = router;