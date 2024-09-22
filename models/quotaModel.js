const pool = require("../pool"); // Import the pool configured with .env

const Quota = {
  async getAllQuotas() {
    const query = `
      SELECT * FROM quota
    `;
    const { rows } = await pool.query(query);
    return rows; // Return all quotas
  },

  async getQuotaById(id) {
    const query = `
      SELECT * FROM quota WHERE id = $1
    `;
    const { rows } = await pool.query(query, [id]);
    return rows.length > 0 ? rows[0] : null; // Return quota or null if not found
  },

  async createQuota({ max_quota, qty_satuan_per_quota, qty_kiloan_per_quota }) {
    const query = `
      INSERT INTO quota (max_quota, qty_satuan_per_quota, qty_kiloan_per_quota)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [
      max_quota,
      qty_satuan_per_quota,
      qty_kiloan_per_quota,
    ]);
    return rows[0]; // Return the newly created quota
  },

  async updateQuota(
    id,
    { max_quota, qty_satuan_per_quota, qty_kiloan_per_quota }
  ) {
    const query = `
      UPDATE quota 
      SET max_quota = $1, qty_satuan_per_quota = $2, qty_kiloan_per_quota = $3
      WHERE id = $4
      RETURNING *
    `;
    const { rows } = await pool.query(query, [
      max_quota,
      qty_satuan_per_quota,
      qty_kiloan_per_quota,
      id,
    ]);
    return rows.length > 0 ? rows[0] : null; // Return updated quota or null if not found
  },

  async deleteQuota(id) {
    const query = `
      DELETE FROM quota WHERE id = $1
      RETURNING *
    `;
    const { rows } = await pool.query(query, [id]);
    return rows.length > 0 ? rows[0] : null; // Return deleted quota or null if not found
  },
};

module.exports = Quota;
