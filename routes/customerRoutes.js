// routes/customerRoutes.js
const express = require("express");
const customerControllers = require("../controllers/customerControllers");
const router = express.Router();

router.get("/", customerControllers.getAllCustomers);
router.post("/", customerControllers.addCustomer);

router.get("/id/:id", customerControllers.getCustomerById);
router.put("/id/:id", customerControllers.updateCustomer);
router.post("/delete", customerControllers.deleteCustomer);

module.exports = router;
