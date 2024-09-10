const Payment = require("../models/paymentModel");
const baseResponse = require("../utils/baseResponse");

const paymentControllers = {
  async getAllPayments(req, res) {
    try {
      // Call the service method to get all payments
      const payments = await Payment.getAllPayments();

      return res.status(200).json(baseResponse(200, payments, "Success"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async getPaymentById(req, res) {
    const { id } = req.params;

    try {
      // Call the service method to get the payment by ID
      const payment = await Payment.getPaymentById(id);

      if (!payment) {
        return res
          .status(404)
          .json(baseResponse(404, null, "Payment not found"));
      }

      return res.status(200).json(baseResponse(200, payment, "Success"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async createPayment(req, res) {
    const { discount, amount, payment_status, payment_method } = req.body;

    try {
      // Call the service method to create a new payment
      const newPayment = await Payment.createPayment(
        discount,
        amount,
        payment_status,
        payment_method
      );

      return res
        .status(201)
        .json(baseResponse(201, newPayment, "Payment created successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async updatePayment(req, res) {
    const { id } = req.params;
    const { discount, amount, payment_status, payment_method } = req.body;

    try {
      // Call the service method to update the payment
      const updatedPayment = await Payment.updatePayment(
        id,
        discount,
        amount,
        payment_status,
        payment_method
      );

      if (!updatedPayment) {
        return res
          .status(404)
          .json(baseResponse(404, null, "Payment not found"));
      }

      return res
        .status(200)
        .json(
          baseResponse(200, updatedPayment, "Payment updated successfully")
        );
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async deletePayment(req, res) {
    const { id } = req.params;

    try {
      // Call the service method to delete the payment
      const deletedPayment = await Payment.deletePayment(id);

      if (!deletedPayment) {
        return res
          .status(404)
          .json(baseResponse(404, null, "Payment not found"));
      }

      return res
        .status(200)
        .json(baseResponse(200, null, "Payment deleted successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },
};

module.exports = paymentControllers;
