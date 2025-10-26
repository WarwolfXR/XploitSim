/**
 * init_db.js
 * -----------------------------------------
 * Initializes the SQLite database for XploitSim.
 * Creates tables if they do not exist.
 * Safe for sandbox/demo use only.
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

const sqlite3 = require('sqlite3').verbose();

// Resolve DB path absolutely relative to this script
const dbPath = path.resolve(__dirname, '../../db/xploitsim.sqlite');

if (fs.existsSync(dbPath)) {
  console.log(`Database file already exists at ${dbPath}`);
  console.log('If you want to recreate, delete the file and run this script again.');
  process.exit(0);
}

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  console.log(`Creating database at ${dbPath}`);

  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      role TEXT
    );
  `);

  db.run(`
    CREATE TABLE logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
});

db.close(() => {
  console.log(`Database created at ${dbPath}`);
});
