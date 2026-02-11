import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminAllEvents.css";

const AdminAllEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
 
  const role = localStorage.getItem("role");

  useEffect(() => {
    // ADMIN PROTECTION
    if (role !== "admin") {
      navigate("/");
      return;
    }

    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, [navigate, role]);

  // DELETE EVENT
  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  // FORMAT DATE
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="admin-events-page">
      <h2>All Events</h2>

      {events.length === 0 ? (
        <p className="no-events">No events available</p>
      ) : (
        <table className="admin-events-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Name</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={event.image}
                    alt={event.eventName}
                    className="event-icon"
                  />
                </td>

                {/* ✅ FIXED KEYS */}
                <td>{event.eventName}</td>
                <td>{formatDate(event.date)}</td>
                <td>{event.venue}</td>
                <td>{event.eventType}</td>

                <td className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/admin/edit-event/${index}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  ); 
};

export default AdminAllEvents;