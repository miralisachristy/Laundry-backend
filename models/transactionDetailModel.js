const pool = require("../pool"); // Import the pool configured with .env

const TransactionDetail = {
  async getTransactionDetails(limit, offset) {
    const query = `
          SELECT td.id_detail, td.id_service, td.quantity, td.price, td.remarks, td.created_at, td.finished_date,
                 s.image, s.service_name, s.service_type, s.processing_time, s.price AS service_price
          FROM transaction_details td
          JOIN service s ON td.id_service = s.id_service
          LIMIT $1 OFFSET $2
        `;

    const { rows } = await pool.query(query, [limit, offset]);
    return rows;
  },

  async getFilteredDetails(page, limit, sort, order, service_type) {
    const offset = (page - 1) * limit;
    const queryParams = [limit, offset];

    let query = `
      SELECT td.id_detail, td.id_service, td.quantity, td.price, td.remarks, td.created_at, td.finished_date,
             s.image, s.service_name, s.service_type, s.processing_time, s.price AS service_price
      FROM transaction_details td
      JOIN service s ON td.id_service = s.id_service
    `;

    if (service_type) {
      query += ` WHERE s.service_type = $3`;
      queryParams.push(service_type);
    }

    query += ` ORDER BY ${sort} ${order} LIMIT $1 OFFSET $2`;

    const { rows } = await pool.query(query, queryParams);
    return rows;
  },

  async getDetailById(id) {
    const query = `
      SELECT td.id_detail, td.id_service, td.quantity, td.price, td.remarks, td.created_at, td.finished_date,
             s.image, s.service_name, s.service_type, s.processing_time, s.price AS service_price
      FROM transaction_details td
      JOIN service s ON td.id_service = s.id_service
      WHERE td.id_detail = $1
    `;

    const { rows } = await pool.query(query, [id]);
    return rows.length ? rows[0] : null;
  },

  async createDetail({
    id_service,
    quantity,
    price,
    remarks,
    created_at,
    finished_date,
  }) {
    const query = `
      INSERT INTO transaction_details (id_service, quantity, price, remarks, created_at, finished_date) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;

    const { rows } = await pool.query(query, [
      id_service,
      quantity,
      price,
      remarks,
      created_at,
      finished_date,
    ]);

    return rows[0];
  },

  async updateDetail(
    id,
    { id_service, quantity, price, remarks, created_at, finished_date }
  ) {
    const query = `
      UPDATE transaction_details 
      SET id_service = $1, quantity = $2, price = $3, remarks = $4, created_at = $5, finished_date = $6 
      WHERE id_detail = $7 RETURNING *
    `;

    const { rows } = await pool.query(query, [
      id_service,
      quantity,
      price,
      remarks,
      created_at,
      finished_date,
      id,
    ]);

    return rows.length > 0 ? rows[0] : null;
  },

  async deleteDetail(id) {
    const query = `
      DELETE FROM transaction_details WHERE id_detail = $1 RETURNING *
    `;

    const { rows } = await pool.query(query, [id]);

    return rows.length > 0 ? rows[0] : null;
  },
};

module.exports = TransactionDetail;
