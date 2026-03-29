const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS email_signups (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      source TEXT DEFAULT 'homepage',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS investor_inquiries (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      role TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log("Database tables ready.");
}

module.exports = { pool, migrate };
