const express = require("express");
const router = express.Router();
const inventoryControllers = require("../controllers/inventoryControllers");

// Route to add a service to the cart
router.get("/", inventoryControllers.getAllInventory);
router.post("/", inventoryControllers.createInventory);

router.post("/delete", inventoryControllers.deleteInventoryItems);

// router.get("/check-item-code/:item_code", inventoryControllers.checkItemCode);

module.exports = router;
