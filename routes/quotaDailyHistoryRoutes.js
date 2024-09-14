const express = require("express");
const quotaDailyHistoryControllers = require("../controllers/quotaDailyHistoryControllers");

const router = express.Router();

// Get all quota daily history records
router.get("/", quotaDailyHistoryControllers.getAll);

router.get("/from-today", quotaDailyHistoryControllers.getFromToday);

// Get a specific quota daily history record by ID
router.get("/:id", quotaDailyHistoryControllers.getById);

// Create a new quota daily history record
router.post("/", quotaDailyHistoryControllers.create);

// Update an existing quota daily history record by ID
router.put("/:id", quotaDailyHistoryControllers.update);

// Delete a quota daily history record by ID
router.delete("/:id", quotaDailyHistoryControllers.delete);

module.exports = router;
