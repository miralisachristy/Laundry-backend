const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig"); // Import multer configuration
const serviceControllers = require("../controllers/serviceController");

router.get("/", serviceControllers.getAllService);

router.post("/", upload.single("image"), serviceControllers.createService);

//CONTOH PAKE QUERY
router.get("/filter", serviceControllers.getServiceFilter);

//CONTOH PAKE PARAMS
router.get("/id/:id", serviceControllers.getServiceById);
router.put("/id/:id", upload.single("image"), serviceControllers.updateService);
router.delete("/id/:id", serviceControllers.deleteService);

module.exports = router;
