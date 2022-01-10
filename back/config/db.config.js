const mysql = require("mysql");

// Create a connection to the database

// module.exports = {
//   host: "localhost",
//   user: "root",
//   password: "c+-jsgg6",
//   database: "p7"
// }

module.exports ={
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB
}