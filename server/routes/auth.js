/**
 * /auth routes
 * - POST /auth/login : local password login -> returns JWT
 * - GET /auth/me : optional auth returns user info if token provided
 *
 * This endpoint demonstrates how JWTs are used in sandbox; we intentionally provide a simple login.
 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const DB_FILE = process.env.DATABASE_FILE || path.join(__dirname, '../db/xploitsim.sqlite');
const SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';
const db = new sqlite3.Database(DB_FILE);

// POST /auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });

  db.get('SELECT id, username, password_hash, role FROM users WHERE username = ?', [username], (err, row) => {
    if (err) return res.status(500).json({ error: 'db error', details: err.message });
    if (!row) return res.status(401).json({ error: 'invalid credentials' });

    const ok = bcrypt.compareSync(password, row.password_hash);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });

    // sign JWT with id and role
    const token = jwt.sign({ id: row.id, username: row.username, role: row.role }, SECRET, { expiresIn: '2h' });
    return res.json({ token });
  });
});

// GET /auth/me (optional auth)
const { optionalAuth } = require('../middleware/jwtAuth');
router.get('/me', optionalAuth, (req, res) => {
  if (!req.user) return res.status(200).json({ message: 'Not authenticated (no token provided)' });
  return res.json({ user: req.user });
});

module.exports = router;
