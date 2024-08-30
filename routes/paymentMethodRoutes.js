// routes/paymentMethodRoutes.js
const express = require("express");
const pool = require("../pool");
const router = express.Router();

// Get all payment methods
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM payment_method");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get a payment method by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM payment_method WHERE id_payment_method = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Payment method not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create a new payment method
router.post("/", async (req, res) => {
  const { payment_method } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO payment_method (payment_method) VALUES ($1) RETURNING *`,
      [payment_method]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update a payment method
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { payment_method } = req.body;
  try {
    const result = await pool.query(
      `UPDATE payment_method SET payment_method = $1 WHERE id_payment_method = $2 RETURNING *`,
      [payment_method, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Payment method not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a payment method
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM payment_method WHERE id_payment_method = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Payment method not found" });
    }
    res.json({ message: "Payment method deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
