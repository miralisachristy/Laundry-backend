const User = require("../models/userModel");
const baseResponse = require("../utils/baseResponse");

const userControllers = {
  async getAllUsers(req, res) {
    try {
      // Call the service method to get all users
      const users = await User.getAllUsers();
      return res
        .status(200)
        .json(baseResponse(200, users, "Users fetched successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async getUserById(req, res) {
    const { id } = req.params;

    try {
      // Call the service method to get the user by ID
      const user = await User.getUserById(id);

      if (!user) {
        return res.status(404).json(baseResponse(404, null, "User not found"));
      }

      return res
        .status(200)
        .json(baseResponse(200, user, "User fetched successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async createUser(req, res) {
    const { role, name, username, password, email, phone } = req.body;

    if (!role || !name || !username || !password || !email || !phone) {
      return res
        .status(400)
        .json(baseResponse(400, null, "All fields are required"));
    }

    try {
      const newUser = await User.createUser({
        role,
        name,
        username,
        password,
        email,
        phone,
      });

      return res
        .status(201)
        .json(baseResponse(201, newUser, "User created successfully"));
    } catch (error) {
      console.error("Error creating user:", error);
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { role, name, username, password, email, phone } = req.body;

    try {
      // Call the service method to update the user
      const updatedUser = await User.updateUser(id, {
        role,
        name,
        username,
        password,
        email,
        phone,
      });

      if (!updatedUser) {
        return res.status(404).json(baseResponse(404, null, "User not found"));
      }

      return res
        .status(200)
        .json(baseResponse(200, updatedUser, "User updated successfully"));
    } catch (error) {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal server error"));
    }
  },

  // Controller: userController.js

  async deleteUsers(req, res) {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json(baseResponse(400, null, "No user IDs provided"));
    }

    try {
      // Call the service method to delete users
      const deletedUsers = await User.deleteUsers(ids);

      if (deletedUsers.length === 0) {
        return res.status(404).json(baseResponse(404, null, "Users not found"));
      }

      return res
        .status(200)
        .json(baseResponse(200, deletedUsers, "Users deleted successfully"));
    } catch (error) {
      console.error("Error deleting users:", error);
      return res
        .status(500)
        .json(baseResponse(500, null, "Failed to delete users."));
    }
  },
};

module.exports = userControllers;
