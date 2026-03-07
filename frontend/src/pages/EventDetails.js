import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/eventDetails.css";

const EventDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const events = JSON.parse(localStorage.getItem("events")) || [];
  const event = events[id];

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (!event) {
    return <h2 style={{ textAlign: "center" }}>Event Not Found</h2>;
  }

  return (
    <div className="event-details-container">

      <div className="event-details-card">

        {/* Event Image */}
        <div className="event-image-box">
          <img src={event.image} alt={event.eventName} />
        </div>

        {/* Event Info */}
        <div className="event-info">

          <h2>{event.eventName}</h2>

          <p><b>Type:</b> {event.eventType}</p>

          {/* Show Amount if Paid */}
          {event.eventType === "Paid" && (
            <p><b>Amount:</b> ₹{event.amount}</p>
          )}

          <p><b>Date:</b> {formatDate(event.date)}</p>

          <p><b>Time:</b> {event.time}</p>

          <p><b>Venue:</b> {event.venue}</p>

          {/* 🔴 NOT LOGGED IN */}
          {!isLoggedIn && (
            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Login to Register
            </button>
          )}

          {/* 🟢 STUDENT */}
          {isLoggedIn === "true" && role === "student" && (
            <button
              className="enroll-btn"
              onClick={() => navigate(`/event/${id}/register`)}
            >
              Register Now
            </button>
          )}

        </div>

      </div>

    </div>
  );
};

export default EventDetails;

