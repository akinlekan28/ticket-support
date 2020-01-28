const mysql = require("mysql2/promise");

const dbName = process.env.MYSQLDB;

mysql
  .createConnection({
    host: process.env.MYSQLHOST || "127.0.0.1",
    port: process.env.DB_PORT || "3306",
    user: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASS || "root"
  })
  .then(connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName};`).then(res => {
      console.info("Database create or successfully checked");
      process.exit(0);
    })
  });