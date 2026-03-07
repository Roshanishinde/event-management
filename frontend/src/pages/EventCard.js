import React from 'react';
import '../styles/dashboard.css';

const EventCard = ({ event, isRegistered, onRegister }) => {
  return (
    <div className="event-card">

      {/* Event Image */}
      <img 
        src={event.image} 
        alt={event.eventName} 
        className="event-image"
      />

      <div className="event-content">

        {/* Event Title */}
        <h3 className="event-title">{event.eventName}</h3>

        {/* Event Type */}
        <p className="event-type">
          Type: {event.eventType}
        </p>

        {/* Amount if Paid */}
        {event.eventType === "Paid" && (
          <p className="event-amount">
            Amount: ₹{event.amount}
          </p>
        )}

        {/* Date */}
        <div className="detail-item">
          <span className="icon">📅</span>
          <span>{event.date}</span>
        </div>

        {/* Time */}
        <div className="detail-item">
          <span className="icon">🕒</span>
          <span>{event.time}</span>
        </div>

        {/* Venue */}
        <div className="detail-item">
          <span className="icon">📍</span>
          <span>{event.venue}</span>
        </div>

        {/* Register Button */}
        <button
          className="register-btn"
          onClick={() => onRegister(event)}
          disabled={isRegistered}
        >
          {isRegistered ? 'Registered' : 'Register Now'}
        </button>

      </div>

    </div>
  );
};

export default EventCard;