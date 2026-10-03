const express = require("express");

const {
  uploadDataset,
} = require("../controller/uploadController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Upload CSV / JSON file
router.post(
  "/",
  protect,
  upload.single("file"),
  uploadDataset
);

module.exports = router;