const express = require("express");
const quotaDailyHistoryControllers = require("../controllers/quotaDailyHistoryControllers");

const router = express.Router();

// Get all quota daily history records
router.get("/", quotaDailyHistoryControllers.getAll);

// Create a new quota daily history record
router.post("/", quotaDailyHistoryControllers.create);

router.get("/from-today", quotaDailyHistoryControllers.getFromToday);

router.put("/id/:id", quotaDailyHistoryControllers.update);

// Get a specific quota daily history record by ID
router.get("/id/:id", quotaDailyHistoryControllers.getById);

// Delete a quota daily history record by ID
router.delete("/id/:id", quotaDailyHistoryControllers.delete);

module.exports = router;
