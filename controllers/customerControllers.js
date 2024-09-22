const Customer = require("../models/customerModel");
const baseResponse = require("../utils/baseResponse");

const customerControllers = {
  async getAllCustomers(req, res) {
    try {
      // Call the service method to get all customers
      const result = await Customer.getAllCustomers();
      return res.status(200).json(baseResponse(200, result, "Success"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async getCustomerById(req, res) {
    const { id } = req.params;

    try {
      // Call the service method to get the customer by ID
      const customer = await Customer.getCustomerById(id);

      if (!customer) {
        return res
          .status(404)
          .json(baseResponse(404, null, "Customer not found"));
      }
      return res.status(200).json(baseResponse(200, customer, "Success"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async addCustomer(req, res) {
    const { name, phone, email, address } = req.body;

    try {
      // Call the service method to add a new customer
      const newCustomer = await Customer.addCustomer({
        name,
        phone,
        email,
        address,
      });
      return res
        .status(201)
        .json(baseResponse(201, newCustomer, "Customer created successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async updateCustomer(req, res) {
    const { id } = req.params;
    const { name, phone, email, address } = req.body;

    try {
      // Call the service method to update the customer
      const updatedCustomer = await Customer.updateCustomer(id, {
        name,
        phone,
        email,
        address,
      });

      if (!updatedCustomer) {
        return res
          .status(404)
          .json(baseResponse(404, null, "Customer not found"));
      }
      return res
        .status(200)
        .json(
          baseResponse(200, updatedCustomer, "Customer updated successfully")
        );
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async deleteCustomers(req, res) {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json(baseResponse(400, null, "No customer IDs provided"));
    }

    try {
      // Call the service method to delete the customer
      const deletedCustomer = await Customer.deleteCustomer(ids);

      if (!deletedCustomer.length === 0) {
        return res
          .status(404)
          .json(baseResponse(404, null, "Customer not found"));
      }
      return res
        .status(200)
        .json(baseResponse(200, null, "Customer deleted successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },
};

module.exports = customerControllers;
