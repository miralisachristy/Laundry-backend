const express = require("express");
const path = require("path");
const pool = require("../pool");
const router = express.Router();
const upload = require("../config/multerConfig"); // Import multer configuration

// Get all services
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM services");
    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: "No services found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a service by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM services WHERE id_service = $1",
      [id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new service
router.post("/", upload.single("image"), async (req, res) => {
  const { service_name, service_type, processing_time, price } = req.body;
  const image = req.file ? `${req.file.filename}` : ""; // Save the path to the file

  if (!service_name || !service_type || !processing_time || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO services (image, service_name, service_type, processing_time, price, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *",
      [image, service_name, service_type, processing_time, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a service by ID
router.put("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { service_name, service_type, processing_time, price } = req.body;
  const image = req.file ? `/upload/services/${req.file.filename}` : "";

  if (!service_name || !service_type || !processing_time || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "UPDATE services SET image = $1, service_name = $2, service_type = $3, processing_time = $4, price = $5, updated_at = NOW() WHERE id_service = $6 RETURNING *",
      [image, service_name, service_type, processing_time, price, id]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a service by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM services WHERE id_service = $1 RETURNING *",
      [id]
    );

    if (result.rowCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
