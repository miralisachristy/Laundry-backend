const pool = require("../pool"); // Import the pool configured with .env

const Payment = {
  async getAllPayments() {
    const query = `SELECT * FROM payment`;
    const { rows } = await pool.query(query);

    return rows; // Return all payment records
  },

  async getPaymentById(id) {
    const query = `
      SELECT * FROM payment WHERE id_payment = $1
    `;
    const { rows } = await pool.query(query, [id]);

    return rows.length > 0 ? rows[0] : null; // Return the payment record if found, otherwise return null
  },

  async createPayment(discount, amount, payment_status, payment_method) {
    const query = `
      INSERT INTO payment (discount, amount, payment_status, payment_method) 
      VALUES ($1, $2, $3, $4) RETURNING *
    `;
    const { rows } = await pool.query(query, [
      discount,
      amount,
      payment_status,
      payment_method,
    ]);

    return rows[0]; // Return the newly created payment record
  },

  async updatePayment(id, discount, amount, payment_status, payment_method) {
    const query = `
      UPDATE payment 
      SET discount = $1, amount = $2, payment_status = $3, payment_method = $4 
      WHERE id_payment = $5 RETURNING *
    `;
    const { rows } = await pool.query(query, [
      discount,
      amount,
      payment_status,
      payment_method,
      id,
    ]);

    return rows.length > 0 ? rows[0] : null; // Return the updated payment record if found, otherwise return null
  },

  async deletePayment(id) {
    const query = `
      DELETE FROM payment WHERE id_payment = $1 RETURNING *
    `;
    const { rows } = await pool.query(query, [id]);

    return rows.length > 0 ? rows[0] : null; // Return the deleted payment record if found, otherwise return null
  },
};

module.exports = Payment;
