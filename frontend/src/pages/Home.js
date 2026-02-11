import React from "react";
import "./../styles/home.css";

const Home = () => {
  return (
    <div className="home-container">

      {/* Banner */}
      <div className="banner">
        <h1>College Event Management System</h1>
      </div>
 
      {/* About Section */} 
      <div className="content">
        <div className="left-section full-width">
          <h3>ABOUT EVENT MANAGEMENT SYSTEM</h3>
 
          <div className="card"> 
            <img
              src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1600"
              alt="Event Planning"
            />
            <h4>Event Planning</h4>
            <p>
              Helps colleges plan and organize academic and cultural events efficiently.
            </p>
          </div>

          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600"
              alt="Student Participation"
            />
            <h4>Student Participation</h4>
            <p>
              Students can view upcoming events and register online easily.
            </p>
          </div>

          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600"
              alt="Event Themes"
            />
            <h4>Event Themes</h4>
            <p>
              Different event themes and layouts for better user experience.
            </p>
          </div>

          <div className="card">
            <img
              src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1600"
              alt="Admin Management"
            />
            <h4>Admin Management</h4>
            <p>
              Admin can manage events, users, and registrations securely.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;