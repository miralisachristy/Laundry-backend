const express = require("express");
const pool = require("../pool"); // Import the pool configured with .env
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    // Query the database
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: "Username/Password salah" });
    }

    // Directly compare passwords (not recommended for production)
    if (user.password === password) {
      return res.status(200).json(user);
    } else {
      return res.status(401).json({ message: "Username/Password salah" });
    }
  } catch (err) {
    console.error("Error Login:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
