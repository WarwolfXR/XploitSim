import React from 'react';
import { Link } from 'react-router-dom';
import './BrokenAccessControl.css';

const AuthenticationFailures = () => {
  return (
    <div className="broken-access-page">
      {/* Hero Section */}
      <section className="bac-hero">
        <div className="bac-hero-content">
          <div className="bac-hero-text">
            <div className="bac-badge">A02:2021</div>
            <h1 className="bac-title">Authentication Failures</h1>
            <p className="bac-subtitle">
              Authentication failures occur when functions related to authentication are implemented incorrectly, allowing attackers to compromise passwords, keys, or session tokens.
            </p>
            <div className="bac-stats">
              <div className="stat">
                <span className="stat-number">#2</span>
                <span className="stat-label">OWASP Rank</span>
              </div>
              <div className="stat">
                <span className="stat-number">High</span>
                <span className="stat-label">Impact</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bac-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="bac-section bac-overview">
        <div className="bac-container">
          <h2>What Are Authentication Failures?</h2>
          <p>
            Authentication failures arise when an application does not properly protect authentication credentials or session tokens.
            Common issues include weak passwords, missing multi-factor authentication, and improper session management.
          </p>
        </div>
      </section>

      {/* Demo Section */}
      <section className="bac-section bac-code">
        <div className="bac-container">
          <h2>Example Code Snippet</h2>
          <div className="code-comparison">
            <div className="code-block vulnerable">
              <h4>❌ Vulnerable Code</h4>
              <pre>{`// UNSAFE: Weak password validation
if (password.length < 6) {
  return true; // No actual validation
}`}</pre>
            </div>
            <div className="code-block secure">
              <h4>✅ Secure Code</h4>
              <pre>{`// SAFE: Strong password validation
if (!/(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
  throw new Error('Password must contain at least one uppercase letter and number');
}`}</pre>
            </div>
          </div>

          {/* ✅ Correct Try it Yourself Button Placement */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/sandbox/authentication-failures" className="btn btn-outline-warning">
              Try it Yourself
            </Link>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="bac-section bac-resources">
        <div className="bac-container">
          <h2>Additional Resources</h2>
          <div className="resources-grid">
            <a
              href="https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/"
              className="resource-card"
            >
              <div className="resource-icon">📚</div>
              <h3>OWASP Documentation</h3>
              <p>Official OWASP guide for Authentication Failures</p>
            </a>
            <a
              href="https://portswigger.net/web-security/authentication"
              className="resource-card"
            >
              <div className="resource-icon">🔍</div>
              <h3>PortSwigger Academy</h3>
              <p>Hands-on labs for authentication vulnerabilities</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthenticationFailures;
