const express = require("express");
const authControllers = require("../controllers/authControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", authControllers.login);
router.post("/refresh-token", authControllers.authRefreshToken);
// router.post("/forgot-password", authControllers.forgotPassword);

module.exports = router;
