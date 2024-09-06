const express = require("express");
const router = express.Router();
const pool = require("../pool"); // Import the pool configured with .env

// Get outlet by ID
router.get("/outlets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT nama_outlet FROM outlet WHERE id_outlet = $1" ,
      [id]
    );
    if (result.rows.length > 0) {
      res.json({ nama_outlet: result.rows[0].nama_outlet });
    } else {
      res.status(404).send("Outlet not found");
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
