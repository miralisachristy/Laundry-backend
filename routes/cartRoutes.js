const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/cartControllers.js");

// Route to add a service to the cart
router.post("/add", cartControllers.addServiceToCart);

module.exports = router;
