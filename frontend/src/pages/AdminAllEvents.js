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

    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

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


  // FORMAT TIME (AM / PM)
  const formatTime = (time) => {

    if (!time) return "-";

    const [hour, minute] = time.split(":");

    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };



  return (
    <div className="admin-events-page">

    

      {events.length === 0 ? (

        <p className="no-events">No events available</p>

      ) : (

        <table className="admin-events-table">

          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>


          <tbody>

            {events.map((event, index) => (

              <tr key={index}>

                <td>
                  <img
                    src={event.image || "/default-event.png"}
                    alt={event.eventName}
                    className="event-icon"
                  />
                </td>

                <td>{event.eventName}</td>

                <td>{formatDate(event.date)}</td>

                {/* TIME WITH AM / PM */}
                <td>{formatTime(event.time)}</td>

                <td>{event.venue}</td>

                <td>{event.eventType}</td>

                <td>
                  {event.eventType === "Paid"
                    ? `₹${event.amount}`
                    : "Free"}
                </td>

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