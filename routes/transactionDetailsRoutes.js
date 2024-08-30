// routes/transactionDetailsRoutes.js
const express = require("express");
const pool = require("../pool");
const router = express.Router();

// Get all transaction details
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM transaction_details");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get a transaction detail by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM transaction_details WHERE id_detail = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction detail not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create a new transaction detail
router.post("/", async (req, res) => {
  const {
    id_transaction,
    id_service,
    quantity,
    price,
    remarks,
    created_at,
    finished_date,
  } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO transaction_details (id_transaction, id_service, quantity, price, remarks, created_at, finished_date) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        id_transaction,
        id_service,
        quantity,
        price,
        remarks,
        created_at,
        finished_date,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update a transaction detail
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    id_transaction,
    id_service,
    quantity,
    price,
    remarks,
    created_at,
    finished_date,
  } = req.body;
  try {
    const result = await pool.query(
      `UPDATE transaction_details SET id_transaction = $1, id_service = $2, quantity = $3, price = $4, remarks = $5, created_at = $6, finished_date = $7 
      WHERE id_detail = $8 RETURNING *`,
      [
        id_transaction,
        id_service,
        quantity,
        price,
        remarks,
        created_at,
        finished_date,
        id,
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction detail not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a transaction detail
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM transaction_details WHERE id_detail = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Transaction detail not found" });
    }
    res.json({ message: "Transaction detail deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
