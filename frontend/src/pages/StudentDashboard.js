import React, { useState, useEffect } from "react";
import "../styles/studentDashboard.css";
import MyRegistrations from "./MyRegistrations";
import StudentProfile from "./StudentProfile";
import Notifications from "./Notifications"; // Import notifications

const StudentDashboard = () => {
 const username = localStorage.getItem("studentUsername");

  const [activeSection, setActiveSection] = useState("profile");
  const [unreadCount, setUnreadCount] = useState(0);

 useEffect(() => {
  updateUnreadCount();
}, [activeSection]);

  const updateUnreadCount = () => {
    const savedNoti = JSON.parse(localStorage.getItem("notifications")) || [];

    const unread = savedNoti.filter(n => {
      // personal for this user or global or deadline notifications
      const personal = n.type === "personal" && n.user === username;
      const global = n.type === "global";
      const deadline = n.type === "deadline";
      return !n.read && (personal || global || deadline);
    }).length;

    setUnreadCount(unread);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const handleSectionChange = section => {
    setActiveSection(section);

    if (section === "notifications") {
      // mark notifications as read for this user
      const savedNoti = JSON.parse(localStorage.getItem("notifications")) || [];

      const updatedAll = savedNoti.map(n => {
        const personal = n.type === "personal" && n.user === username;
        const globalOrDeadline = n.type === "global" || n.type === "deadline";
        
        if (!n.read && (personal || globalOrDeadline)) {
          return { ...n, read: true };
        }
        return n;
      });

      localStorage.setItem("notifications", JSON.stringify(updatedAll));
      setUnreadCount(0);
    }
  };

  return (
    <div className="student-dashboard">

      {/* SIDEBAR */}
      <div className="student-sidebar">
        <ul>
          <li onClick={() => handleSectionChange("registrations")}>
            📋 My Registrations
          </li>

          <li onClick={() => handleSectionChange("profile")}>
            👤 Profile
          </li>

          <li onClick={() => handleSectionChange("notifications")}>
            🔔 Notifications
            {unreadCount > 0 && (
              <span className="notif-badge">{unreadCount}</span>
            )}
          </li>

          <li onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="student-main">

        {/* TOPBAR */}
        <div className="student-topbar">
          <h1>Welcome, {username}</h1>
        </div>

        {/* CONTENT SECTION */}
        <div className="student-content">

          {/* MY REGISTRATIONS SECTION */}
          {activeSection === "registrations" && <MyRegistrations />}

          {/* PROFILE SECTION */}
          {activeSection === "profile" && <StudentProfile />}

          {/* NOTIFICATIONS SECTION */}
          {activeSection === "notifications" && <Notifications />}

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;