const express = require("express");
const quotaControllers = require("../controllers/quotaControllers");

const router = express.Router();

// Get all quotas
router.get("/", quotaControllers.getAllQuotas);

// Create a new quota
router.post("/", quotaControllers.createQuota);

// Get a quota by ID
router.get("/:id", quotaControllers.getQuotaById);

// Update a quota by ID
router.put("/:id", quotaControllers.updateQuotaById);

// Delete a quota by ID
router.delete("/:id", quotaControllers.deleteQuotaById);

module.exports = router;
