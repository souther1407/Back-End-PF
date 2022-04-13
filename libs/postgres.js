require('dotenv').config();
const { Client } = require('pg');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT,
} = process.env;

async function getConnection() {
const cliente = new Client({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});
await cliente.connect();
return cliente;
}

module.exports = getConnection;

