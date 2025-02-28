

// backend/config.js
require('dotenv').config();  

const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: process.env.DB_HOST,  // Database host
  user: process.env.DB_USER,  // Database user
  password: process.env.DB_PASSWORD,  // Database password
  database: process.env.DB_NAME,  // Database name
  connectionLimit: 5,  // Max number of connections in the pool
  typeCast: function (field, next) {
    if (field.type === "VAR_STRING") {
      return field.string();
    }
    return next();
  }
});

// Export the pool as an object
module.exports = { pool };  












