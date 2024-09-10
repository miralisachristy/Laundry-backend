const express = require("express");
const authControllers = require("../controllers/authControllers");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", authControllers.login);
router.post("/refresh-token", authControllers.authRefreshToken);

module.exports = router;
