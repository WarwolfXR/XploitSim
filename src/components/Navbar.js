import React from 'react'
import '../App.css'

export default function Navbar() {
  return (
    <>
    <div className='navbar'>
      <div className="align-left">
      <div className="sidebar">
          <button className="menu-btn">☰</button>
        </div>
        
       <div className='logo'>
          <img src="/logo32.png" alt="Logo" />
        </div>
        </div>
          <ul className='link'>
            <li><a href="/">Home</a></li>
            <li><a href="https://owasp.org/Top10/" target="_blank" rel="noopener noreferrer"> Study Material</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
    </div>

    </>
  )
}
