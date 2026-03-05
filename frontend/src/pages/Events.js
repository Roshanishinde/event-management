import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/events.css";
 import api from "../api/axios";
const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();


useEffect(() => {
  api.get("/events").then(res => setEvents(res.data));
}, []);

  return (  
    <div className="events-page">
     

      <div className="events-grid">
        {events.length === 0 ? (
          <p style={{ textAlign: "center" }}>No events available</p>
        ) : (
          events.map((event, index) => (
            <div
              key={index}
              className="event-card"
              onClick={() => navigate(`/event/${index}`)}
            >
              <img src={event.image} alt={event.eventName} />
              <h4>{event.eventName}</h4>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
