const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // Use port from .env
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Pool behavior
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONN_LIMIT || 8),
  maxIdle: Number(process.env.DB_MAX_IDLE || 5), // keep few idles
  idleTimeout: Number(process.env.DB_IDLE_TIMEOUT || 60000), // recycle before host kills (60s)
  queueLimit: 0,

  // Keep TCP alive so NAT/firewalls don’t drop it
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,

  // Encoding & dates: safer on shared hosts
  dateStrings: true,
  charset: "utf8mb4_general_ci",
});

// db.connect((err) => {
//   if (err) {
//     console.error("Database connection failed:", err.message);
//     return;
//   }
//   console.log("MySQL Connected...");
// });

module.exports = db;
