const express = require("express");
const router = express.Router();
const inventoryControllers = require("../controllers/inventoryControllers");

// Route to add a service to the cart
router.get("/", inventoryControllers.getAllInventory);

module.exports = router;
