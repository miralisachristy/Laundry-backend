// routes/transactionDetailsRoutes.js
const express = require("express");
const pool = require("../pool");
const router = express.Router();

// Get all transaction details with related service data
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT td.id_detail, td.id_service, td.quantity, td.price, td.remarks, td.created_at, td.finished_date,
             s.image, s.service_name, s.service_type, s.processing_time, s.price AS service_price
      FROM transaction_details td
      JOIN service s ON td.id_service = s.id_service
    `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get transaction detail by id with related service data
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT td.id_detail, td.id_service, td.quantity, td.price, td.remarks, td.created_at, td.finished_date,
             s.image, s.service_name, s.service_type, s.processing_time, s.price AS service_price
      FROM transaction_details td
      JOIN service s ON td.id_service = s.id_service
      WHERE td.id_detail = $1
    `;

    const result = await pool.query(query, [id]);

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
  const { id_service, quantity, price, remarks, created_at, finished_date } =
    req.body;
  try {
    const result = await pool.query(
      `INSERT INTO transaction_details (id_service, quantity, price, remarks, created_at, finished_date) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [id_service, quantity, price, remarks, created_at, finished_date]
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
  const { id_service, quantity, price, remarks, created_at, finished_date } =
    req.body;
  try {
    const result = await pool.query(
      `UPDATE transaction_details SET id_service = $1, quantity = $2, price = $3, remarks = $4, created_at = $5, finished_date = $6 
      WHERE id_detail = $7 RETURNING *`,
      [id_service, quantity, price, remarks, created_at, finished_date, id]
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
