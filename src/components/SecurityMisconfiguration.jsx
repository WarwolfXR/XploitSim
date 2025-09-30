import React from 'react';
import './VulnerabilityPage.css';

const SecurityMisconfiguration = () => {
  return (
    <div className="vulnerability-page">
      <section className="vp-hero">
        <div className="vp-hero-content">
          <div className="vp-hero-text">
            <div className="vp-badge">A05:2021</div>
            <h1 className="vp-title">Security Misconfiguration</h1>
            <p className="vp-subtitle">
              Insecure configurations in any part of the application stack, from network services to platform settings. 
              The most commonly seen issue across applications and systems.
            </p>
            <div className="vp-stats">
              <div className="vp-stat">
                <span className="vp-stat-number">#5</span>
                <span className="vp-stat-label">OWASP Rank</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">90%</span>
                <span className="vp-stat-label">Apps Affected</span>
              </div>
              <div className="vp-stat">
                <span className="vp-stat-number">Medium</span>
                <span className="vp-stat-label">Impact</span>
              </div>
            </div>
          </div>
          <div className="vp-hero-visual">
            <div className="vp-security-icon">
              <div className="vp-icon">⚙️</div>
              <div className="vp-icon-text">Configuration</div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-section vp-overview">
        <div className="vp-container">
          <h2>Configuration Security Risks</h2>
          <div className="vp-overview-grid">
            <div className="vp-overview-content">
              <p>
                Security misconfiguration is the most commonly seen issue across applications and systems. 
                It occurs when security settings are defined, implemented, and maintained as defaults. 
                This includes unnecessary features, default accounts, verbose error messages, and improperly configured permissions.
              </p>
              <p>
                The problem spans the entire application stack: platform, web server, application server, database, 
                framework, and custom code. Automated scanners are useful for detecting misconfigurations, but manual 
                review is often required for business logic flaws.
              </p>
              <div className="vp-impact-box">
                <h4>🚨 Configuration Risks</h4>
                <ul>
                  <li>Unauthorized access to system data or functionality</li>
                  <li>Complete system compromise through default credentials</li>
                  <li>Information disclosure through verbose error messages</li>
                  <li>Denial of service through resource exhaustion</li>
                  <li>Compliance violations and audit failures</li>
                </ul>
              </div>
            </div>
            <div className="vp-overview-visual">
              <div className="vp-data-flow">
                <div className="vp-flow-step">
                  <div className="vp-step-number">1</div>
                  <div className="vp-step-content">
                    <strong>Default Installation</strong>
                    <span>System installed with default settings</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">2</div>
                  <div className="vp-step-content">
                    <strong>No Hardening</strong>
                    <span>Security hardening not performed</span>
                  </div>
                </div>
                <div className="vp-flow-step vp-vulnerable">
                  <div className="vp-step-number">3</div>
                  <div className="vp-step-content">
                    <strong>Misconfiguration</strong>
                    <span>Insecure settings left in place</span>
                  </div>
                </div>
                <div className="vp-flow-step">
                  <div className="vp-step-number">4</div>
                  <div className="vp-step-content">
                    <strong>Exploitation</strong>
                    <span>Attackers exploit weak configuration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vp-section vp-vectors">
        <div className="vp-container">
          <h2>Common Misconfiguration Types</h2>
          <div className="vp-vectors-grid">
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">🔓</div>
              <h3>Default Credentials</h3>
              <p>Systems deployed with default usernames and passwords that are publicly known and easily guessable.</p>
              <div className="vp-vector-example">
                <code>admin/admin, root/root, sa/[blank]</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">📝</div>
              <h3>Verbose Error Messages</h3>
              <p>Applications revealing stack traces, database dumps, or system information in error messages.</p>
              <div className="vp-vector-example">
                <code>Showing SQL errors with table names and queries</code>
              </div>
            </div>
            <div className="vp-vector-card vp-high">
              <div className="vp-vector-icon">📁</div>
              <h3>Directory Listing</h3>
              <p>Web servers configured to show directory contents when no index file is present.</p>
              <div className="vp-vector-example">
                <code>Directory browsing enabled in Apache/Nginx</code>
              </div>
            </div>
            <div className="vp-vector-card vp-medium">
              <div className="vp-vector-icon">🚫</div>
              <h3>Unnecessary Features</h3>
              <p>Unused ports, services, pages, accounts, or privileges enabled and accessible.</p>
              <div className="vp-vector-example">
                <code>Sample applications, test pages, debug endpoints</code>
              </div>
            </div>
            <div className="vp-vector-card vp-medium">
              <div className="vp-vector-icon">🌐</div>
              <h3>Insecure Headers</h3>
              <p>Missing security headers like HSTS, CSP, X-Frame-Options, or X-Content-Type-Options.</p>
              <div className="vp-vector-example">
                <code>Missing X-Frame-Options: DENY</code>
              </div>
            </div>
            <div className="vp-vector-card vp-critical">
              <div className="vp-vector-icon">☁️</div>
              <h3>Cloud Misconfigurations</h3>
              <p>Publicly accessible cloud storage, open security groups, or excessive IAM permissions.</p>
              <div className="vp-vector-example">
                <code>S3 buckets with public read/write access</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real World Examples */}
      <section className="vp-section vp-examples">
        <div className="vp-container">
          <h2>Real-World Misconfiguration Breaches</h2>
          <div className="vp-examples-timeline">
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2022</div>
              <div className="vp-timeline-content">
                <h4>Microsoft Power Apps Data Exposure</h4>
                <p>Misconfigured OData APIs in Microsoft Power Apps exposed 38 million records including COVID-19 vaccination data, social security numbers, and contact information.</p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">38M Records</span>
                  <span className="vp-impact-badge">Multiple Orgs</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2021</div>
              <div className="vp-timeline-content">
                <h4>Volkswagen & Audi Data Leak</h4>
                <p>Misconfigured cloud storage exposed 3.3 million customer records including driver license numbers and social security numbers for Audi and Volkswagen customers.</p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">3.3M Customers</span>
                  <span className="vp-impact-badge">Auto Industry</span>
                </div>
              </div>
            </div>
            <div className="vp-timeline-item">
              <div className="vp-timeline-year">2019</div>
              <div className="vp-timeline-content">
                <h4>First American Financial Corp</h4>
                <p>Website misconfiguration exposed 885 million sensitive customer records including bank account numbers, social security numbers, and mortgage documents.</p>
                <div className="vp-breach-impact">
                  <span className="vp-impact-badge">885M Documents</span>
                  <span className="vp-impact-badge">Financial Data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Section */}
      <section className="vp-section vp-prevention">
        <div className="vp-container">
          <h2>Prevention & Hardening Strategies</h2>
          <div className="vp-prevention-grid">
            <div className="vp-prevention-category">
              <h3>🛡️ Secure Configuration</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Hardened Baselines</h4>
                  <p>Use security-hardened configuration baselines for all platforms and frameworks.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Automated Deployment</h4>
                  <p>Implement automated, repeatable secure deployment processes for all environments.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Least Privilege</h4>
                  <p>Run applications with minimal required privileges and remove unnecessary features.</p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>🔍 Continuous Monitoring</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Configuration Scanning</h4>
                  <p>Use automated tools to continuously scan for misconfigurations and deviations.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Change Management</h4>
                  <p>Implement strict change control processes for all configuration modifications.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Audit Logging</h4>
                  <p>Maintain comprehensive audit logs of all configuration changes and access attempts.</p>
                </div>
              </div>
            </div>
            <div className="vp-prevention-category">
              <h3>⚙️ Security Controls</h3>
              <div className="vp-strategy-list">
                <div className="vp-strategy">
                  <h4>Security Headers</h4>
                  <p>Implement comprehensive security headers and Content Security Policy.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Error Handling</h4>
                  <p>Configure applications to show generic error messages without system details.</p>
                </div>
                <div className="vp-strategy">
                  <h4>Regular Updates</h4>
                  <p>Keep all platforms, frameworks, and dependencies updated and patched.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="vp-section vp-code">
        <div className="vp-container">
          <h2>Secure Configuration Examples</h2>
          <div className="vp-code-comparison">
            <div className="vp-code-block vp-vulnerable">
              <h4>❌ Insecure Configuration</h4>
              <pre>{`# UNSAFE: Default credentials
spring.datasource.username=sa
spring.datasource.password=

# UNSAFE: Verbose errors
server.error.include-stacktrace=always
server.error.include-message=always

# UNSAFE: Development settings in production
spring.h2.console.enabled=true
spring.jpa.show-sql=true

# UNSAFE: Weak security headers
server.servlet.session.cookie.http-only=false

# UNSAFE: Directory listing
Options +Indexes`}</pre>
            </div>
            <div className="vp-code-block vp-secure">
              <h4>✅ Secure Configuration</h4>
              <pre>{`# SECURE: Strong credentials
spring.datasource.username=app_user
spring.datasource.password=${process.env.DB_PASSWORD}

# SECURE: Generic errors
server.error.include-stacktrace=never
server.error.include-message=on_param

# SECURE: Production hardening
spring.h2.console.enabled=false
spring.jpa.show-sql=false

# SECURE: Security headers
server.servlet.session.cookie.http-only=true
server.servlet.session.cookie.secure=true
security.headers.hsts=max-age=31536000

# SECURE: Disable directory listing
Options -Indexes`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="vp-section vp-resources">
        <div className="vp-container">
          <h2>Additional Resources</h2>
          <div className="vp-resources-grid">
            <a href="https://owasp.org/Top10/A05_2021-Security_Misconfiguration/" className="vp-resource-card">
              <div className="vp-resource-icon">📚</div>
              <h3>OWASP Security Configuration Guide</h3>
              <p>Complete guide to secure configuration practices</p>
            </a>
            <a href="https://cheatsheetseries.owasp.org/cheatsheets/Security_Headers_Cheat_Sheet.html" className="vp-resource-card">
              <div className="vp-resource-icon">🛡️</div>
              <h3>Security Headers Cheat Sheet</h3>
              <p>Comprehensive guide to HTTP security headers</p>
            </a>
            <a href="https://www.cisecurity.org/cis-benchmarks/" className="vp-resource-card">
              <div className="vp-resource-icon">🔍</div>
              <h3>CIS Benchmarks</h3>
              <p>Industry-standard security configuration benchmarks</p>
            </a>
            <a href="https://cwe.mitre.org/data/definitions/16.html" className="vp-resource-card">
              <div className="vp-resource-icon">📋</div>
              <h3>CWE-16: Configuration</h3>
              <p>Common Weakness Enumeration for configuration issues</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SecurityMisconfiguration;