import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminAllEvents.css";

const AdminRegisteredEvents = () => {

  const navigate = useNavigate();

  const events = JSON.parse(localStorage.getItem("events")) || [];
  const registrations =
    JSON.parse(localStorage.getItem("registrations")) || [];

  const getCount = (eventId) => {
    return registrations.filter((r) => r.eventId === eventId).length;
  };

  return (
    <div className="admin-events-page">

      

      {events.length === 0 && <p>No events available</p>}

      <div className="events-grid">

        {events.map((event, index) => (

          <div
            key={index}
            className="event-card"
            onClick={() =>
              navigate(`/admin/registered-students/${index}`)
            }
          >

            {/* EVENT IMAGE COVER */}
            <div className="event-image">
              <img src={event.image} alt={event.eventName} />
            </div>

            {/* Overlay info */}
            <div className="event-overlay">
              <h3>{event.eventName}</h3>
              <p>Students: {getCount(index)}</p>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AdminRegisteredEvents;
