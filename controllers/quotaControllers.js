const Quota = require("../models/quotaModel"); // Adjust the path if necessary
const baseResponse = require("../utils/baseResponse");

const quotaControllers = {
  async getAllQuotas(req, res) {
    try {
      // Call the model method to get all quotas
      const quotas = await Quota.getAllQuotas();
      return res
        .status(200)
        .json(baseResponse(200, quotas, "Quotas retrieved successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error (quotas)"));
    }
  },

  async getQuotaById(req, res) {
    const { id } = req.params;

    try {
      // Call the model method to get the quota by ID
      const quota = await Quota.getQuotaById(id);

      if (!quota) {
        return res.status(404).json(baseResponse(404, null, "Quota not found"));
      }

      return res
        .status(200)
        .json(baseResponse(200, quota, "Quota retrieved successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async createQuota(req, res) {
    const { max_quota, qty_satuan_per_quota, qty_kiloan_per_quota } = req.body;

    // Validate that all fields are provided
    if (
      max_quota === undefined ||
      qty_satuan_per_quota === undefined ||
      qty_kiloan_per_quota === undefined
    ) {
      return res
        .status(400)
        .json(baseResponse(400, null, "All fields are required"));
    }

    try {
      // Call the model method to create a new quota
      const newQuota = await Quota.createQuota({
        max_quota,
        qty_satuan_per_quota,
        qty_kiloan_per_quota,
      });

      return res
        .status(201)
        .json(baseResponse(201, newQuota, "Quota created successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async updateQuotaById(req, res) {
    const { id } = req.params;
    const { max_quota, qty_satuan_per_quota, qty_kiloan_per_quota } = req.body;

    // Validate that all fields are provided
    if (
      max_quota === undefined ||
      qty_satuan_per_quota === undefined ||
      qty_kiloan_per_quota === undefined
    ) {
      return res
        .status(400)
        .json(baseResponse(400, null, "All fields are required"));
    }

    try {
      // Call the model method to update the quota
      const updatedQuota = await Quota.updateQuota(id, {
        max_quota,
        qty_satuan_per_quota,
        qty_kiloan_per_quota,
      });

      if (updatedQuota) {
        return res
          .status(200)
          .json(baseResponse(200, updatedQuota, "Quota updated successfully"));
      } else {
        return res.status(404).json(baseResponse(404, null, "Quota not found"));
      }
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async deleteQuotaById(req, res) {
    const { id } = req.params;

    try {
      // Call the model method to delete the quota
      const deletedQuota = await Quota.deleteQuota(id);

      if (deletedQuota) {
        return res
          .status(200)
          .json(baseResponse(200, null, "Quota deleted successfully"));
      } else {
        return res.status(404).json(baseResponse(404, null, "Quota not found"));
      }
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },
};

module.exports = quotaControllers;
