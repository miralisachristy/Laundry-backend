const multer = require("multer");
const path = require("path");
const { ensureDirectoryExistence } = require("../utils/directoryUtils.js"); // Import the directory utility function

// Define the directory paths
const uploadDir = path.join(__dirname, "../upload");
const servicesDir = path.join(uploadDir, "services");

// Ensure directories exist
ensureDirectoryExistence(uploadDir);
ensureDirectoryExistence(servicesDir);

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, servicesDir); // Set the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get the file extension
    const baseName = path.basename(file.originalname, ext); // Get the original file name without extension
    const timestamp = Date.now(); // Get the current timestamp
    cb(null, `${baseName}_${timestamp}${ext}`); // Save file with original name and timestamp
  },
});

const upload = multer({ storage });

module.exports = upload;
