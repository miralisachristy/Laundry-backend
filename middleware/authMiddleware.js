const jwt = require("jsonwebtoken");
const baseResponse = require("../utils/baseResponse");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json(baseResponse(401, null, "No token provided"));
  }

  const token = authHeader.split(" ")[2];

  if (!token) {
    return res.status(400).json(baseResponse(400, null, "No token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    req.userId = userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json(baseResponse(401, null, "Token Expired"));
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json(baseResponse(401, null, "Invalid token"));
    } else {
      return res
        .status(500)
        .json(baseResponse(500, null, "Internal Server Error"));
    }
  }
};

module.exports = { authMiddleware };
