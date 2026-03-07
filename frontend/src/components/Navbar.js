import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/home.css";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
 
  const goToDashboard = () => {
    if (role === "admin") {
      navigate("/admin-dashboard");
    } else if (role === "student") {
      navigate("/student-dashboard");
    } 
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="top-wrapper">
      <div className="top-title">
        College Event Management System
      </div> 

      <div className="menu-bar">
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/about">ABOUT US</Link></li>
          <li><Link to="/events">EVENTS</Link></li>

          {/* SINGLE DASHBOARD */}
          {isLoggedIn && (
            <li style={{ cursor: "pointer" }} onClick={goToDashboard}>
              DASHBOARD
            </li>
          )}

          {/* LOGIN */}
          {!isLoggedIn && (
            <li><Link to="/login">LOGIN</Link></li>
          )}

          {/* LOGOUT */}
          {isLoggedIn && (
            <li style={{ cursor: "pointer" }} onClick={handleLogout}>
              LOGOUT
            </li>
          )}

          {/* CONTACT US - ONLY FOR LOGGED-IN STUDENTS */}
          {isLoggedIn && role === "student" && (
            <li><Link to="/contact">CONTACT US</Link></li>
          )}

        </ul>
      </div>
    </div>
  );
};

export default Navbar;