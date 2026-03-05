import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminAllEvents.css";
import api from "../api/axios";
import { useParams } from "react-router-dom";
const AdminRegisteredEvents = () => {
  const navigate = useNavigate();
const {eventId} = useParams
const [registrations, setRegistrations] = useState([]);
  api.get(`/registrations/${eventId}`)
   .then(res => setRegistrations(res.data));
  // count students per event
  const getCount = (eventId) =>
    registrations.filter((r) => r.eventId === eventId).length;
 const [events, setEvents] = useState ([]);
  return (
    <div className="admin-events-page">
      <h2>Registered Events</h2>

      {events.length === 0 && <p>No events added yet</p>}

      <div className="events-grid">
        {events.map((event, index) => (
          <div
            key={index}
            className="event-card"
            onClick={() =>
              navigate(`/admin/registered-students/${index}`)
            }
          >
            <img src={event.image} alt={event.eventName} />
            <h3>{event.eventName}</h3>

            <p style={{ fontWeight: "bold", color: "green" }}>
              Students: {getCount(index)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminRegisteredEvents;
