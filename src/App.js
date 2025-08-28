import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Understand from './components/Understand';
import Securesection from './components/Securesection';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />

      <div className="hero-container">
        <img src="herophoto.jpg" alt="Hero" />

        <div className="hero-text">
          <h1>Discover the OWASP Top 10 Vulnerabilities</h1>
          <h4>
            Welcome to our platform, where we illuminate the critical OWASP Top 10
            security vulnerabilities that every developer should know. Stay informed
            and protect your applications with our comprehensive insights and
            resources.
          </h4>
        </div>
      </div>

      <Securesection />
      <Understand />

      
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default App;
