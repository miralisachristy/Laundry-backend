const pool = require("../pool"); // Import the pool configured with .env

const Service = {
  async getServices() {
    const query = `
            SELECT * FROM services
        `;
    const { rows } = await pool.query(query);
    return rows;
  },

  async getServicesById(idService) {
    const query = `
        SELECT * FROM services
        WHERE id_service = $1
    `;
    const { rows } = await pool.query(query, [idService]);
    console.log(rows);
    return rows;
  },

  // async getServiceByFilter(serviceType, price) {
  //   let query = `SELECT * FROM services`;
  //   const params = [];

  //   if (serviceType) {
  //     query += ` WHERE service_type = $1`;
  //     params.push(serviceType);
  //   }

  //   const { rows } = await pool.query(query, params);
  //   return rows;
  // },

  async getServiceByFilter(serviceType, price) {
    let query = `SELECT * FROM services`;
    const params = [];
    let conditionCount = 0;

    if (serviceType) {
      query += ` WHERE service_type = $${++conditionCount}`;
      params.push(serviceType);
    }

    if (price) {
      if (conditionCount > 0) {
        query += ` AND price = $${++conditionCount}`;
      } else {
        query += ` WHERE price = $${++conditionCount}`;
      }
      params.push(price);
    }

    console.log("Query: ", query); // For debugging
    console.log("Params: ", params); // For debugging

    const { rows } = await pool.query(query, params);
    return rows;
  },

  async createService({
    image,
    service_name,
    service_type,
    processing_time,
    price,
    unit,
  }) {
    const query = `
    INSERT INTO services (image, service_name, service_type, processing_time, price, unit, created_at, updated_at) 
    VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) 
    RETURNING *
  `;
    const values = [
      image,
      service_name,
      service_type,
      processing_time,
      price,
      unit,
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async updateService(
    id,
    { image, service_name, service_type, processing_time, price }
  ) {
    const query = `
    UPDATE services 
    SET image = $1, service_name = $2, service_type = $3, processing_time = $4, price = $5, updated_at = NOW() 
    WHERE id_service = $6 
    RETURNING *
  `;
    const values = [
      image,
      service_name,
      service_type,
      processing_time,
      price,
      id,
    ];
    const { rows } = await pool.query(query, values);
    return rows.length > 0 ? rows[0] : null;
  },

  async deleteService(id) {
    const query = `
    DELETE FROM services 
    WHERE id_service = $1 
    RETURNING *
  `;
    const { rowCount } = await pool.query(query, [id]);
    return rowCount > 0; // Returns true if the deletion was successful, false otherwise
  },
};

module.exports = Service;
