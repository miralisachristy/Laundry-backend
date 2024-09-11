const pool = require("../pool"); // Import the pool configured with .env

const Outlet = {
  async getAllOutlets() {
    const query = `SELECT * FROM outlet`;
    const { rows } = await pool.query(query);

    return rows; // Return all the outlets
  },

  async getOutletName(id) {
    const query = `
      SELECT outlet_name FROM outlet WHERE id_outlet = $1
    `;
    const { rows } = await pool.query(query, [id]);

    return rows.length > 0 ? rows[0].outlet_name : null; // Return the outlet name or null if not found
  },

  async updateOutlet(id, { outlet_name, address, phone, describ }) {
    const query = `
      UPDATE outlet 
      SET outlet_name = $1, address = $2, phone = $3, describ = $4, updated_at = NOW() 
      WHERE id_outlet = $5 
      RETURNING *
    `;
    const { rows } = await pool.query(query, [
      outlet_name,
      address,
      phone,
      describ,
      id,
    ]);

    return rows.length > 0 ? rows[0] : null; // Return the updated outlet or null if not found
  },

  async updateOutletLogo(id, logo) {
    const query = `
      UPDATE outlet 
      SET logo = $1, updated_at = NOW() 
      WHERE id_outlet = $2 
      RETURNING *
    `;

    const { rows } = await pool.query(query, [logo, id]);

    return rows.length > 0 ? rows[0] : null; // Return the updated outlet or null if not found
  },
};

module.exports = Outlet;
