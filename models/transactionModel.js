const pool = require("../pool"); // Import the pool configured with .env

const Transaction = {
  // Fetch all transactions
  async getAllTransactions() {
    const query = `
      SELECT *
      FROM transactions
    `;

    const { rows } = await pool.query(query);
    return rows;
  },

  // Fetch a single transaction by ID
  async getTransactionById(id) {
    const query = `
      SELECT
        id,
        invoice_code,
        transaction_date,
        selected_customer,
        order_details,
        total_before_discount,
        discount_amount,
        total_after_discount,
        payment_method,
        payment_status,
        payment_proof,
        created_at,
        updated_at
      FROM transactions
      WHERE id = $1
    `;

    const { rows } = await pool.query(query, [id]);
    return rows[0] || null; // Return the first row if found, or null if not found
  },

  // Create a new transaction
  async createTransaction({
    invoiceCode,
    transactionDate,
    selectedCustomer,
    orderDetails,
    totalBeforeDiscount,
    discountAmount,
    totalAfterDiscount,
    paymentMethod,
    paymentStatus,
    paymentProof,
  }) {
    const query = `
      INSERT INTO transactions (
        invoice_code, transaction_date, selected_customer,
        order_details, total_before_discount, discount_amount, total_after_discount,
        payment_method, payment_status, payment_proof, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
      RETURNING *
    `;

    const values = [
      invoiceCode,
      transactionDate || new Date(),
      selectedCustomer, // Stored as JSON
      orderDetails, // Stored as JSON
      totalBeforeDiscount,
      discountAmount,
      totalAfterDiscount,
      paymentMethod,
      paymentStatus,
      paymentProof || null, // Filename for payment proof image
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  // Update payment status and proof in an existing transaction
  async updateTransactionPayment({ id, paymentStatus, paymentProof }) {
    const query = `
      UPDATE transactions 
      SET payment_status = $1, payment_proof = $2, updated_at = NOW()
      WHERE id = $3 
      RETURNING *
    `;

    const values = [paymentStatus, paymentProof, id];

    const { rows } = await pool.query(query, values);
    return rows.length > 0 ? rows[0] : null; // Return the updated transaction or null if not found
  },

  // Delete a transaction by ID
  async deleteTransaction(id) {
    const query = `
      DELETE FROM transactions 
      WHERE id = $1 
      RETURNING *
    `;
    const { rows } = await pool.query(query, [id]);

    return rows.length > 0 ? rows[0] : null; // Return the deleted transaction or null if not found
  },
};

module.exports = Transaction;
