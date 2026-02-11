import React from 'react';
import '../styles/dashboard.css';

const EventCard = ({ event, isRegistered, onRegister }) => {
  return (
    <div className="event-card">
      <div className="event-date-badge">
        <span className="month">{event.date.split(' ')[0]}</span>
        <span className="day">{event.date.split(' ')[1].replace(',', '')}</span>
      </div>

      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>

        <div className="event-details">
          <div className="detail-item">
            <span className="icon">🕒</span>
            <span>{event.time}</span>
          </div>
          <div className="detail-item">
            <span className="icon">📍</span>
            <span>{event.venue}</span>
          </div>
        </div>

        <p className="event-description">{event.description}</p>

        <button
          className="register-btn"
          onClick={() => onRegister(event)}
          disabled={isRegistered}
          style={isRegistered ? { backgroundColor: '#e0e0e0', color: '#666', border: 'none', cursor: 'default' } : {}}
        >
          {isRegistered ? 'Registered' : 'Register Now'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;