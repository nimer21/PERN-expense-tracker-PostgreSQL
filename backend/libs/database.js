import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URI, // postgres://user:password@host:port/dbname
  ssl: {
    rejectUnauthorized: false, // Skip certificate validation
    //ca: fs.readFileSync('path/to/server-ca.pem').toString(),
  },
});

pool.connect()
  .then(() => console.log('PostgreSQL Connected successfully ^_^'))
  .catch((err) => console.error('PostgreSQL Connection error', err.stack));