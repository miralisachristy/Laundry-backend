const Transaction = require("../models/transactionModel.js");
const baseResponse = require("../utils/baseResponse");

const transactionControllers = {
  async getAllTransactions(req, res) {
    try {
      // Call the service method to get all transactions
      const transactions = await Transaction.getAllTransactions();
      return res.status(200).json(baseResponse(200, transactions, "Success"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

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

  async createTransaction(req, res) {
    const {
      id_outlet,
      id_user,
      id_customer,
      id_detail,
      id_payment,
      transaction_code,
      total_amount,
      remarks,
      status,
    } = req.body;

    try {
      const newTransaction = await Transaction.createTransaction({
        id_outlet,
        id_user,
        id_customer,
        id_detail,
        id_payment,
        transaction_code,
        total_amount,
        remarks,
        status,
      });

      return res
        .status(201)
        .json(
          baseResponse(201, newTransaction, "Transaction created successfully")
        );
    } catch (error) {
      console.error("Error creating transaction:", error.message);
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async updateTransaction(req, res) {
    const { id } = req.params;
    const {
      id_outlet,
      id_user,
      id_customer,
      id_detail,
      id_payment,
      transaction_code,
      total_amount,
      remarks,
      status,
    } = req.body;

    try {
      const updatedTransaction = await Transaction.updateTransaction({
        id,
        id_outlet,
        id_user,
        id_customer,
        id_detail,
        id_payment,
        transaction_code,
        total_amount,
        remarks,
        status,
      });

      if (!updatedTransaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      return res.json(updatedTransaction);
    } catch (error) {
      console.error("Error updating transaction:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async deleteTransaction(req, res) {
    const { id } = req.params;

    try {
      const deletedTransaction = await Transaction.deleteTransaction(id);

      if (!deletedTransaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }

      return res.json({ message: "Transaction deleted successfully" });
    } catch (error) {
      console.error("Error deleting transaction:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = transactionControllers;
