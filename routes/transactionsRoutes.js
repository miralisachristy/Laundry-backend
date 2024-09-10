// routes/transactionsRoutes.js
const express = require("express");
const transactionControllers = require("../controllers/transactionControllers");
const router = express.Router();

router.get("/", transactionControllers.getAllTransactions);
router.post("/", transactionControllers.createTransaction);

router.get("/id/:id", transactionControllers.getTransactionById);
router.put("/id/:id", transactionControllers.updateTransaction);
router.delete("/id/:id", transactionControllers.deleteTransaction);

module.exports = router;
