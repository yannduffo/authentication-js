const { Pool } = require('pg');
require('dotenv').config();

//configuration du pool de connexion à postgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

//exportation du pool pour le rendre accesible en externe
module.exports = pool;