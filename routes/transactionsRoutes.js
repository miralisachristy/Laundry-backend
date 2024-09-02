// routes/transactionsRoutes.js
const express = require("express");
const pool = require("../pool");
const router = express.Router();

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM transactions");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get a transaction by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM transactions WHERE id_transaction = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create a new transaction
router.post("/", async (req, res) => {
  const {
    id_outlet,
    id_user,
    id_customer,
    id_detail,
    id_payment,
    transaction_code,
    total_amount,
    remarks,
    status,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO transactions (id_outlet, id_user, id_customer, id_detail, id_payment, transaction_code, total_amount, remarks, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        id_outlet,
        id_user,
        id_customer,
        id_detail,
        id_payment,
        transaction_code,
        total_amount,
        remarks,
        status,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update a transaction
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    id_outlet,
    id_user,
    id_customer,
    id_detail,
    id_payment,
    transaction_code,
    total_amount,
    remarks,
    status,
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE transactions SET id_outlet = $1, id_user = $2, id_customer = $3, id_detail = $4, id_payment = $5, 
      transaction_code = $6, total_amount = $7, remarks = $8, status = $9 
      WHERE id_transaction = $10 RETURNING *`,
      [
        id_outlet,
        id_user,
        id_customer,
        id_detail,
        id_payment,
        transaction_code,
        total_amount,
        remarks,
        status,
        id,
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a transaction
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM transactions WHERE id_transaction = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
