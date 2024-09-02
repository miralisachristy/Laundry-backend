// routes/transactionsRoutes.js
const express = require("express");
const pool = require("../pool");
const router = express.Router();

// Get all transactions with related data
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT t.id_transaction, t.transaction_code, t.total_amount, t.remarks, t.status,
             o.nama_outlet, o.alamat AS outlet_address, o.telp AS outlet_phone, o.deskripsi AS outlet_description, o.logo AS outlet_logo,
             u.name AS user_name, u.username, u.email AS user_email, u.phone AS user_phone,
             c.name AS customer_name, c.phone AS customer_phone, c.email AS customer_email, c.address AS customer_address,
             td.id_detail, td.id_service, td.quantity, td.price AS detail_price, td.remarks AS detail_remarks, td.created_at AS detail_created_at, td.finished_date AS detail_finished_date,
             p.discount, p.amount AS payment_amount, p.payment_status, p.payment_method
      FROM transactions t
      JOIN outlet o ON t.id_outlet = o.id_outlet
      JOIN users u ON t.id_user = u.id_user
      JOIN customer c ON t.id_customer = c.id_customer
      JOIN transaction_details td ON t.id_detail = td.id_detail
      JOIN payment p ON t.id_payment = p.id_payment
    `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get a transaction by ID
// Get transaction by id with related data
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT t.id_transaction, t.transaction_code, t.total_amount, t.remarks, t.status,
             o.nama_outlet, o.alamat AS outlet_address, o.telp AS outlet_phone, o.deskripsi AS outlet_description, o.logo AS outlet_logo,
             u.name AS user_name, u.username, u.email AS user_email, u.phone AS user_phone,
             c.name AS customer_name, c.phone AS customer_phone, c.email AS customer_email, c.address AS customer_address,
             td.id_detail, td.id_service, td.quantity, td.price AS detail_price, td.remarks AS detail_remarks, td.created_at AS detail_created_at, td.finished_date AS detail_finished_date,
             p.discount, p.amount AS payment_amount, p.payment_status, p.payment_method
      FROM transactions t
      JOIN outlet o ON t.id_outlet = o.id_outlet
      JOIN users u ON t.id_user = u.id_user
      JOIN customer c ON t.id_customer = c.id_customer
      JOIN transaction_details td ON t.id_detail = td.id_detail
      JOIN payment p ON t.id_payment = p.id_payment
      WHERE t.id_transaction = $1
    `;

    const result = await pool.query(query, [id]);

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
