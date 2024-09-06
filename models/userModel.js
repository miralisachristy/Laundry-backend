const pool = require("../pool"); // Import the pool configured with .env

const User = {
  async findByUsername(username) {
    const query = `
            SELECT * FROM users 
            WHERE username = $1
        `;

    const { rows } = await pool.query(query, [username]);
    return rows[0] || null;
  },

  async updateUser(username, email, phone) {
    //do stuff
  },
};

module.exports = User;
