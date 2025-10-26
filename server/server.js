/**
 * XploitSim - Broken Access Control Sandbox Server (robust DB path)
 *
 * Fix:
 *  - Normalizes DATABASE_FILE so "server/..." won't become "server/server/..."
 *  - Resolves absolute path consistently and sets process.env.DATABASE_FILE
 *  - Auto-create and seed DB in SANDBOX mode if missing
 *
 * WARNING: intentionally vulnerable sandbox. SANDBOX gating prevents accidental production use.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const sqlite3 = require('sqlite3').verbose();

// Safety check helper (will exit if not sandbox)
const sandboxCheck = require('./middleware/sandboxCheck');

// Run sandbox check early (will exit the process if unsafe)
sandboxCheck();

// ------------------------------
// Normalize configured path & compute absolute DB path
// ------------------------------
const configured = process.env.DATABASE_FILE || './db/xploitsim.sqlite';

// `__dirname` is the server directory ( .../XploitSim/server )
const serverDirName = path.basename(__dirname);
const projectRoot = path.resolve(__dirname, '..');

// Normalize: If configured contains a leading "server/" (or "./server/"), resolve it **relative to project root**
// so that "./server/db/xploitsim.sqlite" does NOT become ".../server/server/db/..."
let dbPath;
(function computeDbPath() {
  // remove any leading "./" or ".\" for easier checks
  const cleaned = configured.replace(/^[.\\/]+/, '');
  // if cleaned starts with "server/" or "server\" or exactly the server dir name, resolve from project root
  if (cleaned.startsWith(`${serverDirName}/`) || cleaned.startsWith(`${serverDirName}\\`) || cleaned === serverDirName) {
    // e.g. "server/db/xploitsim.sqlite" -> resolve from projectRoot
    dbPath = path.resolve(projectRoot, cleaned);
  } else {
    // otherwise resolve relative to server dir (previous behavior)
    dbPath = path.resolve(__dirname, configured);
  }
})();

// Make sure process.env contains absolute DB path so other modules are consistent
process.env.DATABASE_FILE = dbPath;

console.log('🗂️ Using database file at:', dbPath);

// ------------------------------
// If DB missing: create and seed (sandbox-only)
// ------------------------------
if (!fs.existsSync(dbPath)) {
  console.warn('⚠️ Database not found. Attempting to create and seed database (sandbox-only).');

  const dbDir = path.dirname(dbPath);
  fs.mkdirSync(dbDir, { recursive: true });

  try {
    // Run init/seed scripts from server directory so they use absolute paths
    execSync('node db/init_db.js', { cwd: __dirname, stdio: 'inherit' });
    execSync('node db/seed.js', { cwd: __dirname, stdio: 'inherit' });
    console.log('✅ Database created and seeded successfully.');
  } catch (err) {
    console.error('❌ Failed to auto-create or seed database');
    console.error(err && err.message ? err.message : err);
    console.error('Please run "node db/init_db.js" and "node db/seed.js" manually from the server/ directory.');
    process.exit(1);
  }
}

// ------------------------------
// Quick verification of DB open (helpful error messages)
// ------------------------------
try {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error('❌ Failed to open database:', err.message);
      if (err.code === 'SQLITE_CANTOPEN') {
        console.error('🔎 SQLITE_CANTOPEN: check file path, permissions, and OneDrive sync issues.');
      }
      process.exit(1);
    } else {
      console.log('✅ Database connection verified.');
    }
  });
  // close verification handle
  db.close();
} catch (err) {
  console.error('❌ Unexpected error while opening DB:', err && err.message ? err.message : err);
  process.exit(1);
}

// ------------------------------
// Require route modules AFTER DB path has been normalized and ensured
// ------------------------------
const authRoutes = require('./routes/auth');
const docRoutes = require('./routes/documents');
const adminRoutes = require('./routes/admin');

const app = express();

// Basic middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/auth', authRoutes);
app.use('/documents', docRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
  res.json({
    message: "XploitSim - Broken Access Control sandbox (development only). Read README_SANDBOX.md for safety rules."
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`XploitSim sandbox server listening at http://localhost:${PORT}`);
});
