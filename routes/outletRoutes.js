// outletRoutes.js
const express = require("express");
const pool = require("../pool");
const router = express.Router();

// Get all outlets
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM outlet");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get an outlet by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM outlet WHERE id_outlet = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Outlet not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Create a new outlet
router.post("/", async (req, res) => {
  const { nama_outlet, alamat, telp, deskripsi, logo } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO outlet (nama_outlet, alamat, telp, deskripsi, created_at, updated_at, logo) 
      VALUES ($1, $2, $3, $4, NOW(), NOW(), $5) RETURNING *`,
      [nama_outlet, alamat, telp, deskripsi, logo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update an outlet
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nama_outlet, alamat, telp, deskripsi, logo } = req.body;
  try {
    const result = await pool.query(
      `UPDATE outlet SET nama_outlet = $1, alamat = $2, telp = $3, deskripsi = $4, updated_at = NOW(), logo = $5 WHERE id_outlet = $6 RETURNING *`,
      [nama_outlet, alamat, telp, deskripsi, logo, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Outlet not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Delete an outlet
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM outlet WHERE id_outlet = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Outlet not found" });
    }
    res.json({ message: "Outlet deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
