const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    allowExitOnIdle: true
});

pool
    .connect()
    .then(client => {
        console.log('Database connected successfully');
        client.release()
    })
    .catch(err => {
        console.error('Error connecting to database:', err.message);
    });

module.exports = pool;