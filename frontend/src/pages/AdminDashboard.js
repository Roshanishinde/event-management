import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [totalEvents, setTotalEvents] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);

  // ADMIN PROTECTION
  useEffect(() => {

    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");
      return;
    }

    loadDashboardData();

  }, [navigate]);


  const loadDashboardData = async () => {

    try {

      const events = await api.get("/api/events");
      setTotalEvents(events.data.length);

      const registrations = await api.get("/api/registrations");
      setTotalRegistrations(registrations.data.length);

    } catch (error) {

      console.log(error);

    }

  };


  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");

    navigate("/");

  };


  return (

    <div className="admin-dashboard">

      <h2 className="admin-title">Admin Dashboard</h2>


      {/* STATS */}
      <div className="dashboard-stats">

        <div className="stat-card">
          <h3>{totalEvents}</h3>
          <p>Total Events</p>
        </div>

        <div className="stat-card">
          <h3>{totalRegistrations}</h3>
          <p>Total Registrations</p>
        </div>

      </div>


      <div className="dashboard-cards">

        <div
          className="dashboard-card"
          onClick={() => navigate("/add-event")}
        >
          <h3>Add New Event</h3>
          <p>Create and publish college events</p>
        </div>


        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/all-events")}
        >
          <h3>All Events</h3>
          <p>View, edit and delete events</p>
        </div>


        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/registered-events")}
        >
          <h3>Registered Users</h3>
          <p>View students registered for events</p>
        </div>


        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/my-account")}
        >
          <h3>My Account</h3>
          <p>View admin profile details</p>
        </div>


        <div
          className="dashboard-card"
          onClick={() => navigate("/admin/contact-messages")}
        >
          <h3>Contact Messages</h3>
          <p>View all messages sent via contact form</p>
        </div>


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