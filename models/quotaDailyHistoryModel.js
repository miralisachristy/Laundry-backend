const pool = require("../pool");

const QuotaDailyHistory = {
  async getAll() {
    const query = `SELECT * FROM quota_daily_history`;
    const { rows } = await pool.query(query);
    return rows;
  },

  async getById(id) {
    const query = `SELECT * FROM quota_daily_history WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  },

  async create({ date, used_quota }) {
    const query = `
      INSERT INTO quota_daily_history (date, used_quota)
      VALUES ($1, $2)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [date, used_quota]);
    return rows[0];
  },

  async update(id, { date, used_quota }) {
    const query = `
      UPDATE quota_daily_history 
      SET date = $1, used_quota = $2
      WHERE id = $3
      RETURNING *
    `;
    const { rows } = await pool.query(query, [date, used_quota, id]);
    return rows.length > 0 ? rows[0] : null;
  },

  async delete(id) {
    const query = `
      DELETE FROM quota_daily_history WHERE id = $1
      RETURNING *
    `;
    const { rows } = await pool.query(query, [id]);
    return rows.length > 0 ? rows[0] : null;
  },

  // Function to get data from today until the last date
  async getFromToday(today) {
    const query = `
      SELECT * 
      FROM quota_daily_history
      WHERE date >= $1
      ORDER BY date ASC
    `;
    const { rows } = await pool.query(query, [today]);
    return rows; // Return all records from today onwards
  },
};

module.exports = QuotaDailyHistory;
