const express = require("express");
const cors = require("cors");
const { pool, migrate } = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((o) => o.trim())
  : ["*"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["POST", "GET"],
}));
app.use(express.json());

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// POST /api/subscribe — waitlist signup
app.post("/api/subscribe", async (req, res) => {
  const { first_name, last_name, email, phone } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email required." });
  }

  try {
    await pool.query(
      `INSERT INTO email_signups (first_name, last_name, email, phone, source)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO UPDATE SET first_name = $1, last_name = $2, phone = $4`,
      [
        first_name?.trim() || null,
        last_name?.trim() || null,
        email.toLowerCase().trim(),
        phone?.trim() || null,
        "homepage",
      ]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("subscribe error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// POST /api/investor-inquiry — investor page form
app.post("/api/investor-inquiry", async (req, res) => {
  const { name, email, phone, role } = req.body;

  if (!name || !email || !email.includes("@")) {
    return res.status(400).json({ error: "Name and valid email required." });
  }

  try {
    await pool.query(
      "INSERT INTO investor_inquiries (name, email, phone, role) VALUES ($1, $2, $3, $4)",
      [name.trim(), email.toLowerCase().trim(), phone?.trim() || null, role?.trim() || null]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("investor-inquiry error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// GET /api/signups — view email signups (protect this in production)
app.get("/api/signups", async (req, res) => {
  const secret = req.headers["x-admin-secret"];
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { rows } = await pool.query("SELECT * FROM email_signups ORDER BY created_at DESC");
  res.json(rows);
});

// GET /api/investor-inquiries — view investor form submissions
app.get("/api/investor-inquiries", async (req, res) => {
  const secret = req.headers["x-admin-secret"];
  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { rows } = await pool.query("SELECT * FROM investor_inquiries ORDER BY created_at DESC");
  res.json(rows);
});

migrate()
  .then(() => {
    app.listen(PORT, () => console.log(`GereOM API running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });
