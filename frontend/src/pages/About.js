import React from "react";
import "../styles/about.css";

const About = () => {
  return (
    <div className="about-page">

       

      <div className="about-main">
        {/* LEFT IMAGE */}
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80"
            alt="College Event"
          />
        </div> 
 
        {/* RIGHT CONTENT */}
        <div className="about-text">
         
          <p>
            The College Event Management System is a web-based application
            developed to efficiently manage and organize college events.
            It provides a centralized platform where administrators can
            manage events and students can participate easily.
          </p>

          <p>
            This system eliminates manual processes and provides a digital
            solution for event scheduling, registrations, and monitoring.
            It improves transparency, communication, and overall efficiency.
          </p>

          <p>
            The application is developed using modern web technologies like
            React, ensuring fast performance, responsiveness, and ease of use.
          </p>
        </div>
      </div>

      {/* FEATURES */}
      <div className="about-features">
        <div className="feature-card">
          <h3>Admin Control</h3>
          <p>
            Admin can create, update, and manage events through a secure
            dashboard interface.
          </p>
        </div>

        <div className="feature-card">
          <h3>Student Access</h3>
          <p>
            Students can view upcoming events and register online without
            any manual paperwork.
          </p>
        </div>

        <div className="feature-card">
          <h3>User Friendly</h3>
          <p>
            Simple, responsive, and easy-to-use interface for all users.
          </p>
        </div>
      </div>

    </div>
  );
};

export default About;