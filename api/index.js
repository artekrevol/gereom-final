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

// POST /api/subscribe — homepage email capture
app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Valid email required." });
  }

  try {
    await pool.query(
      "INSERT INTO email_signups (email, source) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING",
      [email.toLowerCase().trim(), "homepage"]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("subscribe error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

// POST /api/investor-inquiry — investor page form
app.post("/api/investor-inquiry", async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !email.includes("@")) {
    return res.status(400).json({ error: "Name and valid email required." });
  }

  try {
    await pool.query(
      "INSERT INTO investor_inquiries (name, email, role) VALUES ($1, $2, $3)",
      [name.trim(), email.toLowerCase().trim(), role?.trim() || null]
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
