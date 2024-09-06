const jwt = require("jsonwebtoken");
const baseResponse = require("../utils/baseResponse");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json(baseResponse(401, null, "No token provided"));
  }

  const token = authHeader.split(" ")[2];
};
