// routes/statusRoutes.js
const express = require("express");
const pool = require("../pool");
const router = express.Router();

// Get all statuses
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM status");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get a status by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM status WHERE id_status = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Status not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create a new status
router.post("/", async (req, res) => {
  const { status_name } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO status (status_name) VALUES ($1) RETURNING *`,
      [status_name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update a status
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status_name } = req.body;
  try {
    const result = await pool.query(
      `UPDATE status SET status_name = $1 WHERE id_status = $2 RETURNING *`,
      [status_name, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Status not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a status
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM status WHERE id_status = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Status not found" });
    }
    res.json({ message: "Status deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
