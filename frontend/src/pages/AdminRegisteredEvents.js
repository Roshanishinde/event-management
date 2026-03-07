import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminAllEvents.css";
import api from "../api/axios";
import { useParams } from "react-router-dom";

const AdminRegisteredEvents = () => {

  const navigate = useNavigate();
  const { eventId } = useParams();

  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {

    // fetch events
    api.get("/events")
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));

    // fetch registrations
    api.get("/registrations")
      .then(res => setRegistrations(res.data))
      .catch(err => console.log(err));

  }, []);

  // count students per event
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
              navigate(`/admin/registered-students/${event._id}`)
            }
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

    </div>
  );
};

export default AdminRegisteredEvents;