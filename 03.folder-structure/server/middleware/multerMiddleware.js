const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error("Only .jpg, .jpeg or .png image files are allowed!");
    error.code = "INVALID_FILE_TYPE";
    cb(error, false);
  }
};

// Multer setup
const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB limit
  fileFilter,
});

// ✅ Middleware wrapper with error handling
const imageUpload = (req, res, next) => {
  const uploader = upload.single("image"); // or .array("image", 5)

  uploader(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors (size limit, unexpected field, etc.)
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File too large. Max size is 1MB." });
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({ error: "Unexpected field name for file upload." });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // Custom or general error
      if (err.code === "INVALID_FILE_TYPE") {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: "File upload failed." });
    }
    next(); // continue if no errors
  });
};

module.exports = imageUpload;
