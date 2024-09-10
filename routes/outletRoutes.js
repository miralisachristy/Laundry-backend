// outletRoutes.js
const express = require("express");
const outletControllers = require("../controllers/outletControllers");
const upload = require("../config/multerConfig"); // Import multer configuration
const router = express.Router();

router.get("/", outletControllers.getAllOutlets);

router.get("/outlet/:id", outletControllers.getOutletName);
router.put("/id/:id", upload.single("logo"), outletControllers.updateOutlet);

module.exports = router;
