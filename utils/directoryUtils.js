const fs = require("fs");
const path = require("path");

/**
 * Ensure that a directory exists. If not, create it.
 * @param {string} dirPath - The path of the directory to check/create.
 */
const ensureDirectoryExistence = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

module.exports = {
  ensureDirectoryExistence,
};
