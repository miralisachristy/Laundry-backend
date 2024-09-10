// routes/paymentRoutes.js
const express = require("express");
const paymentControllers = require("../controllers/paymentControllers");
const router = express.Router();

router.get("/", paymentControllers.getAllPayments);
router.post("/", paymentControllers.createPayment);

router.get("/id/:id", paymentControllers.getPaymentById);
router.put("/id/:id", paymentControllers.updatePayment);
router.delete("/id/:id", paymentControllers.deletePayment);

module.exports = router;
