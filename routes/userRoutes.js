// routes/userRoutes.js
const express = require("express");
const pool = require("../pool");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id_user = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create a new user
router.post("/", async (req, res) => {
  const { id_outlet, role, name, username, password, email, phone } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (id_outlet, role, name, username, password, email, phone, created_at, updated_at) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) RETURNING *`,
      [id_outlet, role, name, username, password, email, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update a user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { id_outlet, role, name, username, password, email, phone } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET id_outlet = $1, role = $2, name = $3, username = $4, password = $5, email = $6, phone = $7, updated_at = NOW() WHERE id_user = $8 RETURNING *`,
      [id_outlet, role, name, username, password, email, phone, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id_user = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
