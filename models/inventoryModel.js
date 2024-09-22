const pool = require("../pool"); // Import the pool configured with .env
const Service = require("./serviceModel");

const Inventory = {
  async getInventory() {
    const query = `
        SELECT * FROM inventory
        `;
    const { rows } = await pool.query(query);
    return rows;
  },
};

module.exports = Inventory;
