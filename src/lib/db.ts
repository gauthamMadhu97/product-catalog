// Simple SQLite database setup
// Auto-creates database and tables on first run

import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Singleton pattern to avoid multiple connections
let db: Database.Database | null = null;

function getDatabase() {
  if (!db) {
    const dbPath = path.join(dataDir, 'database.sqlite');
    db = new Database(dbPath);
    db.pragma('foreign_keys = ON');
  }
  return db;
}

// Initialize database schema
function initializeDatabase() {
  const database = getDatabase();

  // Users table
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT,
      name TEXT,
      image TEXT,
      provider TEXT DEFAULT 'credentials',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Products table
  database.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      category TEXT,
      image TEXT,
      stock INTEGER DEFAULT 0,
      rating REAL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Wishlist table
  database.exec(`
    CREATE TABLE IF NOT EXISTS wishlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      product_id TEXT NOT NULL,
      added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      UNIQUE(user_id, product_id)
    )
  `);

  // Create indexes for better performance
  database.exec(`CREATE INDEX IF NOT EXISTS idx_wishlist_user ON wishlist(user_id)`);
  database.exec(`CREATE INDEX IF NOT EXISTS idx_products_category ON products(category)`);
}

// Initialize on import
initializeDatabase();

export default getDatabase();
