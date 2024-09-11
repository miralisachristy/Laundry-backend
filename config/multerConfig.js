const multer = require("multer");
const path = require("path");
const { ensureDirectoryExistence } = require("../utils/directoryUtils.js"); // Import the directory utility function

const createMulter = (folderName) => {
  const uploadDir = path.join(__dirname, "../upload", folderName);

  // Ensure the directory exists
  ensureDirectoryExistence(uploadDir);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // Set the dynamic folder
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // Get the file extension
      const baseName = path.basename(file.originalname, ext); // Get the original file name without extension
      const timestamp = Date.now(); // Get the current timestamp
      cb(null, `${baseName}_${timestamp}${ext}`); // Save file with original name and timestamp
    },
  });

  return multer({ storage });
};

module.exports = createMulter;
