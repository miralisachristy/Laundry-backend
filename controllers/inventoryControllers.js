const Inventory = require("../models/inventoryModel.js");
const baseResponse = require("../utils/baseResponse");

const inventoryControllers = {
  async getAllInventory(req, res) {
    try {
      const result = await Inventory.getInventory();
      return res.status(200).json(baseResponse(200, result, "Success"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal Server Error"));
    }
  },
};

module.exports = inventoryControllers;
