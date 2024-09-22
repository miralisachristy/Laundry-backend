const Outlet = require("../models/outletModel.js");
const baseResponse = require("../utils/baseResponse");

const outletControllers = {
  async getAllOutlets(req, res) {
    try {
      // Call the service method to get all outlets
      const outlets = await Outlet.getAllOutlets();

      return res.status(200).json(baseResponse(200, outlets, "Success"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error (outlets)"));
    }
  },

  async getOutletName(req, res) {
    const { id } = req.params;

    try {
      // Call the service method to get the outlet name
      const outletName = await Outlet.getOutletName(id);

      if (!outletName) {
        return res
          .status(404)
          .json(baseResponse(404, null, "Outlet not found"));
      }

      return res
        .status(200)
        .json(baseResponse(200, { outlet_name: outletName }, "Success"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async updateOutlet(req, res) {
    const { id } = req.params;
    const { outlet_name, address, phone, describ } = req.body;

    // Validate that all fields are provided
    if (!outlet_name || !address || !phone || !describ) {
      return res
        .status(400)
        .json(baseResponse(400, null, "All fields are required"));
    }

    try {
      // Call the service method to update the outlet

      const result = await Outlet.updateOutlet(id, {
        outlet_name,
        address,
        phone,
        describ,
      });

      if (result) {
        return res
          .status(200)
          .json(baseResponse(200, result, "Outlet updated successfully"));
      } else {
        return res
          .status(404)
          .json(baseResponse(404, null, "Outlet not found"));
      }
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async updateOutletLogo(req, res) {
    const { id } = req.params;
    const logo = req.file ? `/upload/outlets/${req.file.filename}` : "";

    try {
      // Validate that the logo is provided if a file is uploaded
      if (!logo) {
        return res
          .status(400)
          .json(baseResponse(400, null, "Logo file is required"));
      }

      // Call the service method to update only the logo
      const result = await Outlet.updateOutletLogo(id, logo);

      if (result) {
        return res
          .status(200)
          .json(baseResponse(200, result, "Outlet logo updated successfully"));
      } else {
        return res
          .status(404)
          .json(baseResponse(404, null, "Outlet not found"));
      }
    } catch (error) {
      console.log("Error:", error);
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },
};

module.exports = outletControllers;
