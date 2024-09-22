const Transaction = require("../models/transactionModel.js");
const baseResponse = require("../utils/baseResponse");

const transactionControllers = {
  // Fetch all transactions
  async getAllTransactions(req, res) {
    try {
      const transactions = await Transaction.getAllTransactions();
      return res.status(200).json(baseResponse(200, transactions, "Success"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  // Fetch a single transaction by ID
  async getTransactionById(req, res) {
    const { id } = req.params;
    try {
      const transaction = await Transaction.getTransactionById(id);
      if (!transaction) {
        return res
          .status(404)
          .json(baseResponse(404, null, "Transaction not found"));
      }
      return res.status(200).json(baseResponse(200, transaction, "Success"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  // Create a new transaction
  async createTransaction(req, res) {
    const {
      invoiceCode,
      transactionDate,
      outletName,
      selectedCustomer,
      orderDetails,
      totalBeforeDiscount,
      discountAmount,
      totalAfterDiscount,
      paymentMethod,
      paymentStatus,
    } = req.body;

    const paymentProof = req.file
      ? `/upload/transactions/${req.file.filename}`
      : ""; // Save payment proof filename if uploaded

    // Validate required fields
    if (
      !invoiceCode ||
      !selectedCustomer ||
      !orderDetails.length ||
      !totalAfterDiscount ||
      !paymentMethod ||
      !paymentStatus
    ) {
      return res
        .status(400)
        .json(baseResponse(400, null, "All required fields must be provided"));
    }

    try {
      // Insert the transaction into the database
      const result = await Transaction.createTransaction({
        invoiceCode,
        transactionDate,
        outletName,
        selectedCustomer: JSON.stringify(selectedCustomer), // Save as JSON
        orderDetails: JSON.stringify(orderDetails), // Save as JSON
        totalBeforeDiscount,
        discountAmount,
        totalAfterDiscount,
        paymentMethod,
        paymentStatus,
        paymentProof, // Save the filename of the uploaded payment proof
      });

      return res
        .status(201)
        .json(baseResponse(201, result, "Transaction created successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  // Update payment status and payment proof of an existing transaction
  async updateTransaction(req, res) {
    const { id } = req.params;
    const { paymentStatus } = req.body;
    const paymentProof = req.file ? `${req.file.filename}` : ""; // Save payment proof filename if uploaded

    try {
      const updatedTransaction = await Transaction.updateTransactionPayment({
        id,
        paymentStatus,
        paymentProof,
      });

      if (!updatedTransaction) {
        return res
          .status(404)
          .json(baseResponse(404, null, "Transaction not found"));
      }

      return res
        .status(200)
        .json(
          baseResponse(
            200,
            updatedTransaction,
            "Transaction updated successfully"
          )
        );
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  // Delete a transaction
  async deleteTransaction(req, res) {
    const { id } = req.params;

    try {
      const deletedTransaction = await Transaction.deleteTransaction(id);

      if (!deletedTransaction) {
        return res
          .status(404)
          .json(baseResponse(404, null, "Transaction not found"));
      }

      return res
        .status(200)
        .json(baseResponse(200, null, "Transaction deleted successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },
};

module.exports = transactionControllers;
