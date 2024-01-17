// pool connection for postgres, through the 'pg' library
const { Pool } = require('pg');  

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hackathon2',
    password: 'alaylm013',
    port: 5432,
});

// export
module.exports = pool;