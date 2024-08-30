// middleware/jsonMiddleware.js
const express = require("express");

// Middleware to parse JSON bodies
const jsonMiddleware = express.json();

module.exports = jsonMiddleware;
