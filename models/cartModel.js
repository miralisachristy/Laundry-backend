const pool = require("../pool"); // Import the pool configured with .env

// Model method to add a service to the cart
const addServiceToCart = async ({
  id_service,
  quantity,
  price,
  remarks,
  created_at,
  finished_date,
}) => {
  try {
    const query = `
      INSERT INTO transaction_details (id_service, quantity, price, remarks, created_at, finished_date)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id_detail
    `;
    const values = [
      id_service,
      quantity,
      price,
      remarks,
      created_at,
      finished_date,
    ];
    const { rows } = await pool.query(query, values);
    return rows[0]; // Return the newly created record's ID
  } catch (error) {
    throw new Error("Database query failed");
  }
};

module.exports = {
  addServiceToCart,
};
