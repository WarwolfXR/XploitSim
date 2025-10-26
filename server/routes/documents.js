/**
 * /documents routes - intentionally contains vulnerabilities for teaching:
 *
 * Vulnerable endpoints:
 * - GET /documents/:id  -> IDOR: returns document by id with NO ownership check (anyone with id can view)
 * - GET /documents/owner/:ownerId -> missing authorization (anyone can list docs of a user)
 * - POST /documents/:id/edit -> Improper check: only checks for auth existence but not role or owner
 *
 * NOTE: Comments include suggested mitigation.
 */

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_FILE = process.env.DATABASE_FILE || path.join(__dirname, '../db/xploitsim.sqlite');
const db = new sqlite3.Database(DB_FILE);

const { optionalAuth, requireAuth } = require('../middleware/jwtAuth');

// GET /documents/:id  (IDOR) - vulnerable: no owner check
router.get('/:id', optionalAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.get('SELECT id, owner_id, title, content, created_at FROM documents WHERE id = ?', [id], (err, doc) => {
    if (err) return res.status(500).json({ error: 'db error', details: err.message });
    if (!doc) return res.status(404).json({ error: 'document not found' });

    // VULNERABILITY: returning document to anyone — no ownership/role check
    // Mitigation: ensure that req.user exists and req.user.id === doc.owner_id OR req.user.role === 'admin'
    return res.json({ document: doc, debug: { requester: req.user || null, authError: req.authError || null } });
  });
});

// GET /documents/owner/:ownerId  (missing auth) - vulnerable: anyone can see a user's documents
router.get('/owner/:ownerId', (req, res) => {
  const ownerId = parseInt(req.params.ownerId, 10);
  db.all('SELECT id, owner_id, title, created_at FROM documents WHERE owner_id = ?', [ownerId], (err, docs) => {
    if (err) return res.status(500).json({ error: 'db error', details: err.message });
    return res.json({ documents: docs });
  });
});

// POST /documents/:id/edit - insecure update flow (authorization bypass / privilege escalation possible)
router.post('/:id/edit', requireAuth, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, content } = req.body || {};

  // Vulnerability: only requires that a valid token exists, but doesn't verify ownership or admin rights.
  // A user can edit other user's document by changing the token payload or using another user's token.
  db.get('SELECT owner_id FROM documents WHERE id = ?', [id], (err, doc) => {
    if (err) return res.status(500).json({ error: 'db error', details: err.message });
    if (!doc) return res.status(404).json({ error: 'document not found' });

    db.run('UPDATE documents SET title = ?, content = ? WHERE id = ?', [title || 'Untitled', content || '', id], function (err) {
      if (err) return res.status(500).json({ error: 'db error', details: err.message });
      return res.json({ success: true, affectedRows: this.changes, updatedBy: req.user });
    });
  });
});

module.exports = router;
