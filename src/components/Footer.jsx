import React from "react";
import "../App.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo */}
        <div className="footer-logo-section">
          <img src="/logo32.png" alt="Logo" className="footer-logo" />
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="https://owasp.org/Top10/" target="_blank" rel="noopener noreferrer">Study Material</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: support@example.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Bengaluru, India</p>
        </div>

        {/* Social Icons */}
        <div className="footer-social">
         <h4>Follow Us</h4>
  <ul>
    <li><button className="fake-link">Facebook</button></li>
    <li><button className="fake-link">Instagram</button></li>
    <li><button className="fake-link">LinkedIn</button></li>
  </ul>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} OWASP Project. All rights reserved.</p>
      </div>
    </footer>
  );
}
