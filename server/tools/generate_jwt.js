/**
 * Utility to generate JWT tokens for test users.
 *
 * Usage:
 *   node tools/generate_jwt.js --username alice
 *   node tools/generate_jwt.js --id 2 --role admin
 *
 * This is for local sandbox testing only.
 */

require('dotenv').config();
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const argv = require('yargs').argv;

const SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';
const DB_FILE = process.env.DATABASE_FILE || path.join(__dirname, '../db/xploitsim.sqlite');

function createToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '4h' });
}

function byUsername(username) {
  const db = new sqlite3.Database(DB_FILE);
  db.get('SELECT id, username, role FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error('db error', err);
      process.exit(1);
    }
    if (!row) {
      console.error('User not found');
      process.exit(1);
    }
    console.log('Token for', row);
    console.log(createToken({ id: row.id, username: row.username, role: row.role }));
    db.close();
  });
}

if (argv.username) {
  byUsername(argv.username);
} else {
  // build from provided id/role/username
  const payload = {};
  if (argv.id) payload.id = parseInt(argv.id, 10);
  if (argv.username) payload.username = argv.username;
  if (argv.role) payload.role = argv.role;
  if (!payload.id && !payload.username) {
    console.error('Provide --username or --id');
    process.exit(1);
  }
  console.log(createToken(payload));
}
