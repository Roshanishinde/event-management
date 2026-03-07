import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "../styles/contact.css";
import contactImg from "../Assets/Images/contact.jpg";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Indian date format DD/MM/YYYY
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const currentDate = `${day}/${month}/${year}`;

    const newMessage = {
      name,
      email,
      message,
      date: currentDate,
    };

    // Save to localStorage
    const existingMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];
    localStorage.setItem(
      "contactMessages",
      JSON.stringify([...existingMessages, newMessage])
    );

    alert("✅ Your message has been sent successfully!");

    // Clear form fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-page">
      <div className="contact-container">

        {/* LEFT SIDE IMAGE */}
        <div className="contact-left">
          <img src={contactImg} alt="Contact Us" className="contact-image" />
        </div>

        {/* RIGHT SIDE FORM & INFO */}
        <div className="contact-right">
        
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
            <button type="submit">Send Message</button>
          </form>

          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p><FaPhone /> +91 12345 67890</p>
            <p><FaEnvelope /> info@college.com</p>
            <div className="social-icons">
              <FaFacebook />
              <FaInstagram />
              <FaTwitter />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;