// routes/userRoutes.js
const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();

router.get("/", userControllers.getAllUsers);
router.post("/", userControllers.createUser);

router.get("/id/:id", userControllers.getUserById);
router.put("/id/:id", userControllers.updateUser);
router.post("/delete", userControllers.deleteUsers);

module.exports = router;
