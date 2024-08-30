// routes/historyRoutes.js
const express = require("express");
const pool = require("../pool");
const router = express.Router();

// Get all history records
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM history");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get a history record by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM history WHERE id_history = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "History record not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create a new history record
router.post("/", async (req, res) => {
  const { id_transaction, id_status, id_user, created_at, update_at } =
    req.body;
  try {
    const result = await pool.query(
      `INSERT INTO history (id_transaction, id_status, id_user, created_at, update_at) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id_transaction, id_status, id_user, created_at, update_at]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update a history record
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { id_transaction, id_status, id_user, created_at, update_at } =
    req.body;
  try {
    const result = await pool.query(
      `UPDATE history SET id_transaction = $1, id_status = $2, id_user = $3, created_at = $4, update_at = $5 
      WHERE id_history = $6 RETURNING *`,
      [id_transaction, id_status, id_user, created_at, update_at, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "History record not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a history record
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM history WHERE id_history = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "History record not found" });
    }
    res.json({ message: "History record deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
