const pool = require("../pool"); // Import the pool configured with .env

const Inventory = {
  async getInventory() {
    const query = `
        SELECT * FROM inventory
        `;
    const { rows } = await pool.query(query);
    return rows;
  },

  async createInventory({
    item_code,
    item_name,
    item_type,
    supplier_name,
    remark,
    quantity,
  }) {
    const query = `
      INSERT INTO inventory (item_code, item_name, item_type, supplier_name, remark, quantity, updated_at) 
      VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *
    `;
    const { rows } = await pool.query(query, [
      item_code,
      item_name,
      item_type,
      supplier_name,
      remark,
      quantity,
    ]);

    return rows[0]; // Return the newly added data
  },

  async deleteInventoryItems(ids) {
    // Remove the 'function' keyword
    const query = `
      DELETE FROM inventory 
      WHERE id = ANY($1::int[])
      RETURNING id;
    `;
    const { rows } = await pool.query(query, [ids]);

    return rows; // Return the list of deleted inventory IDs
  },
};

module.exports = Inventory;
