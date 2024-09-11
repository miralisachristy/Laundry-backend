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

  async findByUserId(userId) {
    const query = `
            SELECT * FROM users 
            WHERE id_user = $1
        `;

    const { rows } = await pool.query(query, [userId]);
    return rows[0] || null;
  },

  async getAllUsers() {
    const query = `
      SELECT * FROM users
    `;
    const { rows } = await pool.query(query);
    return rows; // Return the list of users
  },

  async getUserById(id) {
    const query = `
    SELECT * FROM users WHERE id_user = $1
  `;
    const { rows } = await pool.query(query, [id]);

    return rows.length > 0 ? rows[0] : null; // Return the user or null if not found
  },

  async createUser({ role, name, username, password, email, phone }) {
    const query = `
      INSERT INTO users (role, name, username, password, email, phone, created_at, updated_at) 
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *
    `;
    const { rows } = await pool.query(query, [
      role,
      name,
      username,
      password,
      email,
      phone,
    ]);

    return rows[0]; // Return the newly created user
  },

  async updateUser(id, { role, name, username, password, email, phone }) {
    const query = `
      UPDATE users 
      SET role = $1, name = $2, username = $3, password = $4, email = $5, phone = $6, updated_at = NOW() 
      WHERE id_user = $7 
      RETURNING *
    `;
    const { rows } = await pool.query(query, [
      role,
      name,
      username,
      password,
      email,
      phone,
      id,
    ]);

    return rows[0]; // Return the updated user record
  },

  async updateUserToken(idUser, token, refreshToken) {
    const query = `
        UPDATE users
        SET token = $2, refresh_token = $3
        WHERE id_user = $1
    `;
    await pool.query(query, [idUser, token, refreshToken]);
  },

  // Model: userModel.js

  async deleteUsers(ids) {
    const query = `
    DELETE FROM users 
    WHERE id_user = ANY($1::int[])
    RETURNING id_user;
  `;
    const { rows } = await pool.query(query, [ids]);

    return rows; // Return the list of deleted user IDs
  },
};

module.exports = User;
