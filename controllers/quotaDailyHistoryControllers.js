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
    const { date, used, remaining } = req.body;
    if (date === undefined || used === undefined || remaining === undefined) {
      return res
        .status(400)
        .json(baseResponse(400, null, "All fields are required"));
    }
    try {
      const newHistory = await QuotaDailyHistory.create({
        date,
        used,
        remaining,
      });
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
    const { date, used, remaining } = req.body;

    // Ensure all required fields are present
    if (date === undefined || used === undefined || remaining === undefined) {
      return res
        .status(400)
        .json(baseResponse(400, null, "All fields are required"));
    }

    try {
      // Update the quota history record
      const updatedHistory = await QuotaDailyHistory.update(id, {
        date,
        used,
        remaining,
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
      // Catch and respond with an error
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
      const records = await QuotaDailyHistory.getFromToday(today);

      // // Check if records were found
      // if (records.length === 0) {
      //   // Create a default record if none were found
      //   const defaultRecord = {
      //     date: today,
      //     used: quota.max_quota, // Ensure this variable is defined appropriately
      //     remaining: quota.max_quota,
      //   };
      //   await QuotaDailyHistory.insertDefaultRecord(defaultRecord);
      //   // Fetch the newly created record
      //   const newRecords = await QuotaDailyHistory.getFromToday(today);
      //   return res
      //     .status(200)
      //     .json(
      //       baseResponse(200, newRecords, "Created default record successfully")
      //     );
      // }

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
