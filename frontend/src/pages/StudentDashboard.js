import React from "react";
import "../styles/studentDashboard.css";

const StudentDashboard = () => {
  const username = localStorage.getItem("studentUsername") || "Student";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="student-dashboard">

      {/* SIDEBAR */}
      <div className="student-sidebar">
        <h2>Student Panel</h2>

        <ul>
          <li>📋 My Registrations</li>
          <li>👤 Profile</li>
          <li>🔔 Notifications</li>
          <li onClick={handleLogout} className="logout-btn">🚪 Logout</li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="student-main">
        <div className="student-topbar">
          <h3>Welcome, {username}</h3>
        </div>

        <div className="student-content">
          <h2>User Dashboard</h2>
          <p>Select an option from sidebar</p>

          {/* Dummy cards (design only) */}
          <div className="student-cards">
            <div className="student-card">My Registrations</div>
            <div className="student-card">Profile</div>
            <div className="student-card">Notifications</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentDashboard;