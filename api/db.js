const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

async function migrate() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS email_signups (
      id SERIAL PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      source TEXT DEFAULT 'homepage',
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS investor_inquiries (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      linkedin TEXT,
      role TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  // Add new columns to existing tables (safe no-op if already present)
  await pool.query(`
    ALTER TABLE email_signups ADD COLUMN IF NOT EXISTS first_name TEXT;
    ALTER TABLE email_signups ADD COLUMN IF NOT EXISTS last_name TEXT;
    ALTER TABLE email_signups ADD COLUMN IF NOT EXISTS phone TEXT;
    ALTER TABLE investor_inquiries ADD COLUMN IF NOT EXISTS phone TEXT;
    ALTER TABLE investor_inquiries ADD COLUMN IF NOT EXISTS linkedin TEXT;
  `);

  console.log("Database tables ready.");
}

module.exports = { pool, migrate };
