import React, { useState } from 'react';
import '../index.css';
import './VulnerabilityPage.css';

/*
  Authentication Sandbox Demo
  - Client-side in-memory demo only (safe for local/educational use)
  - Demonstrates weak/default passwords, lack of rate-limiting,
    and a simple credential-stuffing simulation.
*/

const users = [
  { username: 'alice', password: 'Password@123' },
  { username: 'bob', password: 'qwerty' }, // intentionally weak
  { username: 'admin', password: 'admin123' } // intentionally default
];

export default function AuthenticationSandbox() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('Try logging in. Hint: bob / qwerty or admin / admin123');
  const [attempts, setAttempts] = useState(0);
  const [attackLog, setAttackLog] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  function handleLogin(e) {
    e?.preventDefault?.();
    if (isLocked) {
      setMessage('Account is temporarily locked due to too many attempts (simulated).');
      return;
    }

    setAttempts(a => a + 1);
    const found = users.find(u => u.username === username && u.password === password);

    if (found) {
      setMessage(`✅ Welcome, ${username}! (Simulated login)`);
      setAttackLog(l => [...l, `Successful login: ${username}`]);
    } else {
      setMessage('❌ Invalid username or password.');
      setAttackLog(l => [...l, `Failed login attempt: ${username}`]);
    }

    if (attempts + 1 >= 5) {
      setIsLocked(true);
      setMessage('🔒 Too many failed attempts — account locked (simulated).');
    }
  }

  function runCredentialStuffing() {
    const common = ['123456', 'password', 'qwerty', 'admin', 'admin123'];
    const targets = ['alice', 'bob', 'admin', 'carol'];
    const results = [];

    targets.forEach(t => {
      common.forEach(pw => {
        const success = users.some(u => u.username === t && u.password === pw);
        results.push({ user: t, pw, success });
      });
    });

    setAttackLog(l => [
      ...l,
      '--- Credential Stuffing Simulation ---',
      ...results.map(r => `${r.user}:${r.pw} -> ${r.success ? 'SUCCESS' : 'FAIL'}`)
    ]);
    setMessage('Credential stuffing simulation completed. See attack log.');
  }

  function resetDemo() {
    setUsername('');
    setPassword('');
    setMessage('Try logging in. Hint: bob / qwerty or admin / admin123');
    setAttempts(0);
    setAttackLog([]);
    setIsLocked(false);
  }

  return (
    <div className="vp-page">
      <section className="vp-hero">
        <div className="vp-hero-content">
          <div className="vp-hero-text">
            <div className="vp-badge">A02:2021</div>
            <h1 className="vp-title">Authentication Failures — Sandbox Demo</h1>
            <p className="vp-subtitle">
              Interactive demo showing weak/default credentials, lack of rate-limiting,
              and credential stuffing. Runs entirely in your browser.
            </p>
          </div>
        </div>
      </section>

      <main className="vp-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="vp-grid" style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="vp-card" style={{ textAlign: 'center' }}>
            <h3>Login (Vulnerable Demo)</h3>
            <form onSubmit={handleLogin} className="vp-form" style={{ marginTop: 10 }}>
              <label>Username</label>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="username"
                className="vp-input"
              />
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="password"
                className="vp-input"
              />
              <div style={{ marginTop: 12 }}>
                <button className="vp-btn" type="submit">Login</button>
                <button
                  type="button"
                  className="vp-btn vp-btn-secondary"
                  onClick={resetDemo}
                  style={{ marginLeft: 8 }}
                >
                  Reset
                </button>
              </div>
            </form>

            <p className="vp-note" style={{ marginTop: 10 }}>{message}</p>

            <div style={{ marginTop: 12 }}>
              <button className="vp-btn vp-btn-danger" onClick={runCredentialStuffing}>
                Simulate Credential Stuffing
              </button>
            </div>
          </div>

          <div className="vp-card" style={{ textAlign: 'left' }}>
            <h3>Attack Log</h3>
            <div className="vp-log" style={{ whiteSpace: 'pre-wrap', minHeight: 160 }}>
              {attackLog.length === 0 ? <em>No activity yet.</em> : attackLog.map((l, i) => <div key={i}>{l}</div>)}
            </div>

            <div style={{ marginTop: 12 }}>
              <p>
                <strong>Lesson:</strong> Use strong password policies, multi-factor authentication,
                rate-limiting, account lockouts, and monitoring of failed attempts.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
