const jwt = require("jsonwebtoken");
const baseResponse = require("../utils/baseResponse");

const requestMiddleware = (req, res, next) => {
  console.log(req);
  next();
};

module.exports = requestMiddleware;
