const Service = require("../models/serviceModel");
const baseResponse = require("../utils/baseResponse");

const serviceControllers = {
  async getAllService(req, res) {
    try {
      const result = await Service.getServices();
      return res.status(200).json(baseResponse(200, result, "Success"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async getServiceById(req, res) {
    const id = req.params.id;
    try {
      const result = await Service.getServicesById(id);

      return res.status(200).json(baseResponse(200, result, "Success"));
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async getServiceFilter(req, res) {
    const serviceType = req.query.service_type;
    const { service_type } = req.query;

    const price = req.query.price;
    try {
      const result = await Service.getServiceByFilter(serviceType, price);
      return res.status(200).json(baseResponse(200, result, "Success"));
    } catch (error) {
      console.log("error: ", error);
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async createService(req, res) {
    const { service_name, service_type, processing_time, price } = req.body;
    const image = req.file ? `${req.file.filename}` : ""; // Save the image filename

    // Check if all required fields are provided
    if (!service_name || !service_type || !processing_time || !price) {
      return res
        .status(400)
        .json(baseResponse(400, null, "All fields are required"));
    }

    try {
      // Call the service method to insert the service
      const result = await Service.createService({
        image,
        service_name,
        service_type,
        processing_time,
        price,
      });
      return res
        .status(201)
        .json(baseResponse(201, result, "Service created successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async updateService(req, res) {
    const { id } = req.params;
    const { service_name, service_type, processing_time, price } = req.body;
    const image = req.file ? `/upload/services/${req.file.filename}` : "";

    // Validate that all fields are provided
    if (!service_name || !service_type || !processing_time || !price) {
      return res
        .status(400)
        .json(baseResponse(400, null, "All fields are required"));
    }

    try {
      // Call the service method to update the service
      const result = await Service.updateService(id, {
        image,
        service_name,
        service_type,
        processing_time,
        price,
      });

      if (result) {
        return res
          .status(200)
          .json(baseResponse(200, result, "Service updated successfully"));
      } else {
        return res
          .status(404)
          .json(baseResponse(404, null, "Service not found"));
      }
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async deleteService(req, res) {
    const { id } = req.params;

    try {
      // Call the service method to delete the service
      const result = await Service.deleteService(id);

      if (result) {
        return res.status(204).send(); // No content, successful deletion
      } else {
        return res
          .status(404)
          .json(baseResponse(404, null, "Service not found"));
      }
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },
};

module.exports = serviceControllers;
