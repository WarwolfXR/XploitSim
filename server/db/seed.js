/**
 * seed.js
 * -----------------------------------------
 * Populates the SQLite database with initial test data.
 * Safe for sandbox/demo use only.
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();

// ✅ Use absolute path like init_db.js
const dbPath = path.resolve(__dirname, '../../db/xploitsim.sqlite');

if (!fs.existsSync(dbPath)) {
  console.error(`❌ Database file not found at: ${dbPath}`);
  console.error('Run init_db.js first.');
  process.exit(1);
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  console.log(`✅ Connected to DB: ${dbPath}`);

  const users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'alice', password: 'password1', role: 'user' },
    { username: 'bob', password: 'password2', role: 'user' },
  ];

  const stmt = db.prepare('INSERT INTO users (username, password, role) VALUES (?, ?, ?)');

  users.forEach((u) => {
    stmt.run(u.username, u.password, u.role, (err) => {
      if (err) console.error(`Error inserting ${u.username}:`, err.message);
      else console.log(`Inserted user: ${u.username}`);
    });
  });

  stmt.finalize();

  db.run("INSERT INTO logs (action) VALUES ('Seed data inserted');", (err) => {
    if (err) console.error(err);
    else console.log('Seed log entry added.');
  });
});

db.close(() => {
  console.log('✅ Database seeding completed.');
});
