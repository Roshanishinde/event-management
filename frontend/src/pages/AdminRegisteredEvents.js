import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminAllEvents.css";
import api from "../api/axios";

const AdminRegisteredEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    api.get("/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.log("Events error:", err));

    api.get("/api/registrations")
      .then((res) => setRegistrations(res.data))
      .catch((err) => console.log("Registrations error:", err));
  }, []);

  const getCount = (eventId) =>
    registrations.filter((r) => String(r.eventId) === String(eventId)).length;

  return (
    <div className="admin-events-page">
      <h2 style={{ marginBottom: "20px" }}>Registered Events</h2>

      {events.length === 0 ? (
        <p>No events available</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div
              key={event._id}
              className="event-card"
           onClick={() => navigate(`/admin/event-students/${event._id}`)}
            >
              <div className="event-image">
                <img src={event.image} alt={event.eventName} />
              </div>

              <div className="event-overlay">
                <h3>{event.eventName}</h3>
                <p>Students: {getCount(event._id)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRegisteredEvents;