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

  async create({ date, used, remaining }) {
    // Changed to used and remaining
    const query = `
      INSERT INTO quota_daily_history (date, used, remaining)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [date, used, remaining]); // Added remaining
    return rows[0];
  },

  async update(id, { date, used, remaining }) {
    const query = `
      UPDATE quota_daily_history 
      SET date = $1, used = $2, remaining = $3
      WHERE id = $4
      RETURNING *
    `;
    const { rows } = await pool.query(query, [date, used, remaining, id]);

    // Return the updated row if available, otherwise return null
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

  async insertDefaultRecord(record) {
    const query = `
        INSERT INTO quota_daily_history (date, used, remaining)
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    const values = [record.date, record.used, record.remaining];
    const { rows } = await pool.query(query, values);
    return rows[0]; // Return the newly created record
  },
};

module.exports = QuotaDailyHistory;
