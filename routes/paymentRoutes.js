// routes/paymentRoutes.js
const express = require("express");
const pool = require("../pool");
const router = express.Router();

// Get all payments
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM payment");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get a payment by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM payment WHERE id_payment = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create a new payment
router.post("/", async (req, res) => {
  const {
    id_transaction,
    id_payment_method,
    discount,
    amount,
    id_payment_status,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO payment (id_transaction, id_payment_method, discount, amount, id_payment_status) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id_transaction, id_payment_method, discount, amount, id_payment_status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update a payment
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    id_transaction,
    id_payment_method,
    discount,
    amount,
    id_payment_status,
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE payment SET id_transaction = $1, id_payment_method = $2, discount = $3, amount = $4, id_payment_status = $5 
      WHERE id_payment = $6 RETURNING *`,
      [
        id_transaction,
        id_payment_method,
        discount,
        amount,
        id_payment_status,
        id,
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a payment
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM payment WHERE id_payment = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.json({ message: "Payment deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
