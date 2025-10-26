/**
 * jwtAuth middleware
 * Verifies JWT if provided and attaches req.user { id, username, role }.
 *
 * NOTE: endpoints in routes may intentionally skip authorization checks to demonstrate vulnerabilities.
 */

const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';

function optionalAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return next();
  const parts = auth.split(' ');
  if (parts.length !== 2) return next();
  const token = parts[1];
  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
  } catch (err) {
    // ignore verification errors for optional auth (demonstration)
    req.authError = err.message;
  }
  next();
}

function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing Authorization header' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(400).json({ error: 'Malformed Authorization header' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token', details: err.message });
  }
}

module.exports = {
  optionalAuth,
  requireAuth
};
