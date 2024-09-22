const multer = require("multer");
const path = require("path");

// Function to create multer instance with a specific folder for file storage
module.exports = function (folderName) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."),
        false
      );
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
  });
};
