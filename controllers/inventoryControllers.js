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

  async createInventory(req, res) {
    const { item_code, item_name, item_type, supplier_name, remark, quantity } =
      req.body;

    // Validate input
    if (
      !item_name ||
      !item_type ||
      !supplier_name ||
      quantity === undefined ||
      remark === undefined ||
      quantity < 0
    ) {
      return res
        .status(400)
        .json(baseResponse(400, null, "All fields are required"));
    }

    try {
      const newInventory = await Inventory.createInventory({
        item_code,
        item_name,
        item_type,
        supplier_name,
        remark,
        quantity,
      });

      return res
        .status(201)
        .json(
          baseResponse(201, newInventory, "Inventory item created successfully")
        );
    } catch (error) {
      console.error("Error creating inventory item:", error.message);
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async checkItemCode(req, res) {
    const { item_code } = req.params; // Get item_code from request parameters

    try {
      const query = "SELECT COUNT(*) FROM inventory WHERE item_code = $1";
      const { rows } = await pool.query(query, [item_code]);

      if (rows[0].count > 0) {
        return res
          .status(409)
          .json(baseResponse(409, null, "Item code already exists"));
      } else {
        return res
          .status(200)
          .json(baseResponse(200, null, "Item code is available"));
      }
    } catch (error) {
      console.error("Error checking item code:", error);
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  // Correctly define the deleteInventoryItems method
  async deleteInventoryItems(req, res) {
    const { ids } = req.body;

    // Check if ids is an array and not empty
    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json(baseResponse(400, null, "No inventory item IDs provided"));
    }

    try {
      const deletedItems = await Inventory.deleteInventoryItems(ids);

      if (deletedItems.length === 0) {
        return res
          .status(404)
          .json(baseResponse(404, null, "Inventory items not found"));
      }

      return res
        .status(200)
        .json(
          baseResponse(
            200,
            deletedItems,
            "Inventory items deleted successfully"
          )
        );
    } catch (error) {
      console.error("Error deleting inventory items:", error);
      return res
        .status(500)
        .json(baseResponse(500, null, "Failed to delete inventory items."));
    }
  },
};

module.exports = inventoryControllers;
