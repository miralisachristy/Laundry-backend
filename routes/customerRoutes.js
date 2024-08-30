// routes/customerRoutes.js
const express = require("express");
const pool = require("../pool");
const router = express.Router();

// Get all customers
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM customer");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get a customer by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM customer WHERE id_customer = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create a new customer
router.post("/", async (req, res) => {
  const { name, phone, email, address } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO customer (name, phone, email, address, created_at) 
      VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
      [name, phone, email, address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update a customer
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, phone, email, address } = req.body;
  try {
    const result = await pool.query(
      `UPDATE customer SET name = $1, phone = $2, email = $3, address = $4 WHERE id_customer = $5 RETURNING *`,
      [name, phone, email, address, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a customer
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM customer WHERE id_customer = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
