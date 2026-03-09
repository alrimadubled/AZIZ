import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("twitter_mgmt.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS tweets (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    scheduled_at TEXT,
    published_at TEXT,
    status TEXT DEFAULT 'draft',
    thread_id TEXT,
    media_ids TEXT
  );

  CREATE TABLE IF NOT EXISTS media (
    id TEXT PRIMARY KEY,
    url TEXT NOT NULL,
    type TEXT NOT NULL,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tweet_id TEXT,
    impressions INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    retweets INTEGER DEFAULT 0,
    replies INTEGER DEFAULT 0,
    date TEXT NOT NULL
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/tweets", (req, res) => {
    const tweets = db.prepare("SELECT * FROM tweets ORDER BY scheduled_at DESC").all();
    res.json(tweets);
  });

  app.post("/api/tweets", (req, res) => {
    const { id, content, scheduled_at, status, thread_id, media_ids } = req.body;
    const stmt = db.prepare(`
      INSERT INTO tweets (id, content, scheduled_at, status, thread_id, media_ids)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(id, content, scheduled_at, status || 'draft', thread_id || null, JSON.stringify(media_ids || []));
    res.json({ success: true });
  });

  app.delete("/api/tweets/:id", (req, res) => {
    db.prepare("DELETE FROM tweets WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  app.get("/api/media", (req, res) => {
    const media = db.prepare("SELECT * FROM media").all();
    res.json(media);
  });

  app.post("/api/media", (req, res) => {
    const { id, url, type, name } = req.body;
    db.prepare("INSERT INTO media (id, url, type, name) VALUES (?, ?, ?, ?)").run(id, url, type, name);
    res.json({ success: true });
  });

  app.get("/api/analytics", (req, res) => {
    const stats = db.prepare("SELECT * FROM analytics ORDER BY date ASC").all();
    res.json(stats);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist/index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
