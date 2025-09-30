import React from "react";
import "../App.css";

export default function Contact() {
  const handleClick = (e) => {
    e.preventDefault();
    alert("Your Feedback has been sent successfully!");
  };

  return (
    <div className="contact-container">
   
      <div className="cform">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Fill out the form below.</p>

        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea rows="5" placeholder="Your Message" required></textarea>
          <button type="submit" onClick={handleClick}>
            Send Message
          </button>
        </form>
      </div>

     
      <div className="cimage">
        <img
          src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=800&q=80"
          alt="Contact"
        />
      </div>
    </div>
  );
}
