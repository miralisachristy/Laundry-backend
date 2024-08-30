// routes/paymentStatusRoutes.js
const express = require("express");
const pool = require("../pool");
const router = express.Router();

// Get all payment statuses
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM payment_status");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get a payment status by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM payment_status WHERE id_payment_status = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Payment status not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create a new payment status
router.post("/", async (req, res) => {
  const { payment_status } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO payment_status (payment_status) VALUES ($1) RETURNING *`,
      [payment_status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update a payment status
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { payment_status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE payment_status SET payment_status = $1 WHERE id_payment_status = $2 RETURNING *`,
      [payment_status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Payment status not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a payment status
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM payment_status WHERE id_payment_status = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Payment status not found" });
    }
    res.json({ message: "Payment status deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
