import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const EventCard = ({ event }) => {

  const navigate = useNavigate();

  return (
    <div
      className="event-card"
      onClick={() => navigate(`/event/${event._id}`)}
    >

      <img 
        src={event.image} 
        alt={event.eventName} 
        className="event-image"
      />

      <div className="event-content">

        <h3 className="event-title">{event.eventName}</h3>

        <p className="event-type">
          Type: {event.eventType}
        </p>

        {event.eventType === "Paid" && (
          <p className="event-amount">
            Amount: ₹{event.amount}
          </p>
        )}

        <div className="detail-item">
          📅 {event.date}
        </div>

        <div className="detail-item">
          🕒 {event.time}
        </div>

        <div className="detail-item">
          📍 {event.venue}
        </div>

      </div>

    </div>
  );
};

export default EventCard;