import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/events.css";

const Events = () => {

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/events")
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (

    <div className="events-page">

      <h2 className="events-title">College Events</h2>

      <div className="events-grid">

        {events.map((event) => (

          <div
            className="event-card"
            key={event._id}
            onClick={() => navigate(`/events/${event._id}`)}
          >

            <img src={event.image} alt={event.eventName} />

            <h4>{event.eventName}</h4>

          </div>

        ))}

      </div>

    </div>

  );
};

export default Events;