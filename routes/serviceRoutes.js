const express = require("express");
const router = express.Router();

const serviceControllers = require("../controllers/serviceController");
const createMulter = require("../config/multerConfig");

const upload = createMulter("services");

router.get("/", serviceControllers.getAllService);

router.post("/", upload.single("image"), serviceControllers.createService);

//CONTOH PAKE QUERY
router.get("/filter", serviceControllers.getServiceFilter);

//CONTOH PAKE PARAMS
router.get("/id/:id", serviceControllers.getServiceById);
router.put("/id/:id", upload.single("image"), serviceControllers.updateService);
router.post("/delete", serviceControllers.deleteServices);

module.exports = router;
