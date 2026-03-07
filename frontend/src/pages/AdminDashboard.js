import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // ADMIN PROTECTION
  useEffect(() => {
     const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Admin Dashboard</h2>

      <div className="dashboard-cards">

        {/* ADD NEW EVENT */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/add-event")}
        >
          <h3>Add New Event</h3>
          <p>Create and publish college events</p>
        </div>

        {/* ALL EVENTS */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/all-events")}
        >
          <h3>All Events</h3>
          <p>View, edit and delete events</p>
        </div>  

        {/* ✅ REGISTERED USERS (FIXED ROUTE) */}
        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/registered-events")}
        >
          <h3>Registered Users</h3>
          <p>View students registered for events</p>
        </div>
     {/* MY ACCOUNT */}
         <div
         className="dashboard-card"
         onClick={() => navigate("/admin/my-account")}
        >
          <h3>My Account</h3>
          <p>View admin profile details</p>
        </div>

        {/* CONTACT MESSAGES */}
          <div
           className="dashboard-card"
             onClick={() => navigate("/admin/contact-messages")}
          >
            <h3>Contact Messages</h3>
             <p>View all messages sent via contact form</p>
             </div>
        

       

        {/* LOGOUT */}
        <div
          className="dashboard-card logout-card"
          onClick={handleLogout}
        >
          <h3>Logout</h3>
          <p>Exit from admin panel</p>
        </div>

        

      </div>
    </div>
  );
};

export default AdminDashboard;