const QuotaDailyHistory = require("../models/quotaDailyHistoryModel");
const baseResponse = require("../utils/baseResponse");

const quotaDailyHistoryControllers = {
  async getAll(req, res) {
    try {
      const history = await QuotaDailyHistory.getAll();
      return res
        .status(200)
        .json(
          baseResponse(
            200,
            history,
            "Quota daily history retrieved successfully"
          )
        );
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const history = await QuotaDailyHistory.getById(id);
      if (!history) {
        return res
          .status(404)
          .json(baseResponse(404, null, "History not found"));
      }
      return res
        .status(200)
        .json(
          baseResponse(
            200,
            history,
            "Quota daily history retrieved successfully"
          )
        );
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async create(req, res) {
    const { date, used_quota } = req.body;
    if (date === undefined || used_quota === undefined) {
      return res
        .status(400)
        .json(baseResponse(400, null, "All fields are required"));
    }
    try {
      const newHistory = await QuotaDailyHistory.create({ date, used_quota });
      return res
        .status(201)
        .json(
          baseResponse(
            201,
            newHistory,
            "Quota daily history created successfully"
          )
        );
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { date, used_quota } = req.body;
    if (date === undefined || used_quota === undefined) {
      return res
        .status(400)
        .json(baseResponse(400, null, "All fields are required"));
    }
    try {
      const updatedHistory = await QuotaDailyHistory.update(id, {
        date,
        used_quota,
      });
      if (updatedHistory) {
        return res
          .status(200)
          .json(
            baseResponse(
              200,
              updatedHistory,
              "Quota daily history updated successfully"
            )
          );
      } else {
        return res
          .status(404)
          .json(baseResponse(404, null, "History not found"));
      }
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      const deletedHistory = await QuotaDailyHistory.delete(id);
      if (deletedHistory) {
        return res
          .status(200)
          .json(
            baseResponse(200, null, "Quota daily history deleted successfully")
          );
      } else {
        return res
          .status(404)
          .json(baseResponse(404, null, "History not found"));
      }
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async getFromToday(req, res) {
    try {
      const today = new Date().toISOString().split("T")[0]; // Get today's date in 'YYYY-MM-DD' format

      // Call the model to get data from today until the last date
      const records = await QuotaDailyHistory.getFromToday(today);

      // Return a 200 status with an empty array if no records are found
      return res
        .status(200)
        .json(
          baseResponse(
            200,
            records,
            "Data from today until the last date retrieved successfully"
          )
        );
    } catch (error) {
      console.error("Error fetching quota daily history data:", error);
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },
};

module.exports = quotaDailyHistoryControllers;
