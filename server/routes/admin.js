/**
 * /admin routes - intentionally demonstrates missing authorization / privilege escalation.
 *
 * Vulnerable endpoints:
 * - GET /admin/stats : missing role check (anyone can access system stats)
 * - POST /admin/users/:id/role : allows role changes with insufficient authorization checks
 *
 * Use caution: this is intentionally insecure. See comments for mitigations.
 */

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_FILE = process.env.DATABASE_FILE || path.join(__dirname, '../db/xploitsim.sqlite');
const db = new sqlite3.Database(DB_FILE);

const { optionalAuth, requireAuth } = require('../middleware/jwtAuth');

// GET /admin/stats - missing authorization: anyone can call this
router.get('/stats', optionalAuth, (req, res) => {
  // VULNERABILITY: no role check. Should require role === 'admin'.
  db.serialize(() => {
    db.get('SELECT COUNT(*) as users FROM users', (err, urow) => {
      if (err) return res.status(500).json({ error: 'db error', details: err.message });
      db.get('SELECT COUNT(*) as docs FROM documents', (err2, drow) => {
        if (err2) return res.status(500).json({ error: 'db error', details: err2.message });
        return res.json({ stats: { users: urow.users, documents: drow.docs }, requester: req.user || null });
      });
    });
  });
});

// POST /admin/users/:id/role - allows changing role (privilege escalation)
router.post('/users/:id/role', requireAuth, (req, res) => {
  const targetId = parseInt(req.params.id, 10);
  const { role } = req.body || {};

  if (!role) return res.status(400).json({ error: 'role required' });

  // VULNERABILITY: this endpoint trusts that any authenticated user may change role.
  // An attacker could supply a token for a low-priv user and change any target's role.
  // Mitigation: ensure req.user.role === 'admin' before allowing role change.
  db.run('UPDATE users SET role = ? WHERE id = ?', [role, targetId], function (err) {
    if (err) return res.status(500).json({ error: 'db error', details: err.message });
    return res.json({ success: true, affectedRows: this.changes, changedBy: req.user });
  });
});

module.exports = router;
