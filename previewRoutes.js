const express = require("express");

const {
  previewDataset,
} = require("../controller/previewController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Preview uploaded dataset
router.get("/:id", protect, previewDataset);

module.exports = router;