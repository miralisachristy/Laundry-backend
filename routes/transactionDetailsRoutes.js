// routes/transactionDetailsRoutes.js
const express = require("express");
const transactionDetailControllers = require("../controllers/transactionDetailControllers");
const router = express.Router();

router.get("/", transactionDetailControllers.getTransactionDetails);
router.post("/", transactionDetailControllers.createTransactionDetail);

router.get(
  "/filter",
  transactionDetailControllers.getFilteredTransactionDetails
);

router.get("/id/:id", transactionDetailControllers.getTransactionDetailById);
router.put("/id/:id", transactionDetailControllers.updateTransactionDetail);
router.delete("/id/:id", transactionDetailControllers.deleteTransactionDetail);

module.exports = router;
