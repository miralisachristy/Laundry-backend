// outletRoutes.js
const express = require("express");
const outletControllers = require("../controllers/outletControllers");
const createMulter = require("../config/multerConfig");
const router = express.Router();

// Create multer instance for handling logo upload
const uploadLogo = createMulter("outlets");

router.get("/", outletControllers.getAllOutlets);
router.put("/update/:id", outletControllers.updateOutlet);

router.get("/outlet/:id", outletControllers.getOutletName);
router.put(
  "/update-logo/:id",
  uploadLogo.single("logo"),
  outletControllers.updateOutletLogo
);

module.exports = router;
