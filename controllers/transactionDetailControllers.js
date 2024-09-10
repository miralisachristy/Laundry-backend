const TransactionDetail = require("../models/transactionDetailModel.js");
const baseResponse = require("../utils/baseResponse");

const transactionDetailControllers = {
  async getTransactionDetails(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
      const transactionDetails = await TransactionDetail.getTransactionDetails(
        limit,
        offset
      );
      res.json(transactionDetails);
    } catch (error) {
      console.error("Error fetching transaction details:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  async getFilteredTransactionDetails(req, res) {
    const {
      page = 1,
      limit = 10,
      sort = "created_at",
      order = "ASC",
      service_type,
    } = req.query;

    try {
      const result = await TransactionDetail.getFilteredDetails(
        page,
        limit,
        sort,
        order,
        service_type
      );
      return res.status(200).json(baseResponse(200, result, "Success"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async getTransactionDetailById(req, res) {
    const { id } = req.params;

    try {
      const result = await TransactionDetail.getDetailById(id);

      if (!result) {
        return res
          .status(404)
          .json(baseResponse(404, null, "Transaction detail not found"));
      }

      return res.status(200).json(baseResponse(200, result, "Success"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async createTransactionDetail(req, res) {
    const { id_service, quantity, price, remarks, created_at, finished_date } =
      req.body;

    try {
      const result = await TransactionDetail.createDetail({
        id_service,
        quantity,
        price,
        remarks,
        created_at,
        finished_date,
      });

      return res
        .status(201)
        .json(
          baseResponse(201, result, "Transaction detail created successfully")
        );
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async updateTransactionDetail(req, res) {
    const { id } = req.params;
    const { id_service, quantity, price, remarks, created_at, finished_date } =
      req.body;

    try {
      const result = await TransactionDetail.updateDetail(id, {
        id_service,
        quantity,
        price,
        remarks,
        created_at,
        finished_date,
      });

      if (!result) {
        return res
          .status(404)
          .json(baseResponse(404, null, "Transaction detail not found"));
      }

      return res
        .status(200)
        .json(
          baseResponse(200, result, "Transaction detail updated successfully")
        );
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async deleteTransactionDetail(req, res) {
    const { id } = req.params;

    try {
      const result = await TransactionDetail.deleteDetail(id);

      if (!result) {
        return res
          .status(404)
          .json(baseResponse(404, null, "Transaction detail not found"));
      }

      return res
        .status(200)
        .json(
          baseResponse(200, null, "Transaction detail deleted successfully")
        );
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },
};

module.exports = transactionDetailControllers;
