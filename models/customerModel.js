const pool = require("../pool"); // Import the pool configured with .env

const Customer = {
  async getAllCustomers() {
    const query = `
    SELECT * FROM customer
  `;
    const { rows } = await pool.query(query);
    return rows; // Return all customers
  },

  async getCustomerById(id) {
    const query = `
    SELECT * FROM customer WHERE id_customer = $1
  `;
    const { rows } = await pool.query(query, [id]);
    return rows.length > 0 ? rows[0] : null; // Return customer or null if not found
  },

  async addCustomer({ name, phone, email, address }) {
    const query = `
    INSERT INTO customer (name, phone, email, address, created_at)
    VALUES ($1, $2, $3, $4, NOW()) 
    RETURNING *
  `;
    const { rows } = await pool.query(query, [name, phone, email, address]);
    return rows[0]; // Return the newly created customer
  },

  async updateCustomer({ id, name, phone, email, address }) {
    const query = `
    UPDATE customer 
    SET name = $1, phone = $2, email = $3, address = $4 
    WHERE id_customer = $5 
    RETURNING *
  `;
    const { rows } = await pool.query(query, [name, phone, email, address, id]);
    return rows.length > 0 ? rows[0] : null; // Return updated customer or null if not found
  },

  async deleteCustomer(ids) {
    const query = `
    DELETE FROM customer 
    WHERE id_customer = ANY($1::int[])
    RETURNING id_customer
    `;
    const { rows } = await pool.query(query, [ids]);

    return rows; // Return the list of deleted user IDs
  },
};

module.exports = Customer;
