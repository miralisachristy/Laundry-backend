const pool = require("../pool"); // Import the pool configured with .env

const Transaction = {
  // Fetch all transactions with related data
  async getAllTransactions() {
    const query = `
      SELECT
        t.id_transaction,
        t.id_outlet,
        o.outlet_name,
        o.address AS outlet_address,
        o.phone AS outlet_phone,
        u.id_user,
        u.name AS user_name,
        c.id_customer,
        c.name AS customer_name,
        c.phone AS customer_phone,
        c.email AS customer_email,
        c.address AS customer_address,
        d.id_detail,
        d.id_service,
        d.quantity,
        d.price AS detail_price,
        d.remarks AS detail_remarks,
        d.created_at AS detail_created_at,
        d.finished_date,
        p.id_payment,
        p.discount,
        p.amount AS payment_amount,
        p.payment_status,
        p.payment_method,
        t.transaction_code,
        t.total_amount,
        t.remarks AS transaction_remarks,
        t.status AS transaction_status
      FROM
        transactions t
      JOIN outlet o ON t.id_outlet = o.id_outlet
      JOIN users u ON t.id_user = u.id_user
      JOIN customer c ON t.id_customer = c.id_customer
      JOIN transaction_details d ON t.id_detail = d.id_detail
      JOIN payment p ON t.id_payment = p.id_payment
    `;

    const { rows } = await pool.query(query);
    return rows;
  },

  // Fetch a single transaction by ID
  async getTransactionById(id) {
    const query = `
      SELECT
        t.id_transaction,
        t.id_outlet,
        o.outlet_name,
        o.address AS outlet_address,
        o.phone AS outlet_phone,
        u.id_user,
        u.name AS user_name,
        c.id_customer,
        c.name AS customer_name,
        c.phone AS customer_phone,
        c.email AS customer_email,
        c.address AS customer_address,
        d.id_detail,
        d.id_service,
        d.quantity,
        d.price AS detail_price,
        d.remarks AS detail_remarks,
        d.created_at AS detail_created_at,
        d.finished_date,
        p.id_payment,
        p.discount,
        p.amount AS payment_amount,
        p.payment_status,
        p.payment_method,
        t.transaction_code,
        t.total_amount,
        t.remarks AS transaction_remarks,
        t.status AS transaction_status
      FROM
        transactions t
      JOIN outlet o ON t.id_outlet = o.id_outlet
      JOIN users u ON t.id_user = u.id_user
      JOIN customer c ON t.id_customer = c.id_customer
      JOIN transaction_details d ON t.id_detail = d.id_detail
      JOIN payment p ON t.id_payment = p.id_payment
      WHERE t.id_transaction = $1
    `;

    const { rows } = await pool.query(query, [id]);
    return rows[0] || null; // Return the first row if found, or null if not found
  },

  // Create a new transaction
  async createTransaction(transactionData) {
    const {
      id_outlet,
      id_user,
      id_customer,
      id_detail,
      id_payment,
      transaction_code,
      total_amount,
      remarks,
      status,
    } = transactionData;

    const query = `
      INSERT INTO transactions (id_outlet, id_user, id_customer, id_detail, id_payment, transaction_code, total_amount, remarks, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
    `;

    const { rows } = await pool.query(query, [
      id_outlet,
      id_user,
      id_customer,
      id_detail,
      id_payment,
      transaction_code,
      total_amount,
      remarks,
      status,
    ]);

    return rows[0]; // Return the newly created transaction
  },

  // Update an existing transaction
  async updateTransaction({
    id,
    id_outlet,
    id_user,
    id_customer,
    id_detail,
    id_payment,
    transaction_code,
    total_amount,
    remarks,
    status,
  }) {
    const query = `
      UPDATE transactions 
      SET id_outlet = $1, id_user = $2, id_customer = $3, id_detail = $4, id_payment = $5, 
          transaction_code = $6, total_amount = $7, remarks = $8, status = $9 
      WHERE id_transaction = $10 
      RETURNING *
    `;

    const { rows } = await pool.query(query, [
      id_outlet,
      id_user,
      id_customer,
      id_detail,
      id_payment,
      transaction_code,
      total_amount,
      remarks,
      status,
      id,
    ]);

    return rows.length > 0 ? rows[0] : null; // Return the updated transaction or null if not found
  },

  // Delete a transaction by ID
  async deleteTransaction(id) {
    const query = `
      DELETE FROM transactions 
      WHERE id_transaction = $1 
      RETURNING *
    `;
    const { rows } = await pool.query(query, [id]);

    return rows.length > 0 ? rows[0] : null; // Return the deleted transaction or null if not found
  },
};

module.exports = Transaction;
