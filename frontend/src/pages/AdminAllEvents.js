import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/adminAllEvents.css";

const AdminAllEvents = () => {

  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  useEffect(() => {

    if (role !== "admin") {
      navigate("/");
      return;
    }

    loadEvents();

  }, [navigate, role]);



  const loadEvents = () => {

    api.get("/api/events")
      .then(res => {
        setEvents(res.data);
      })
      .catch(err => {
        console.log(err);
      });

  };



  // DELETE EVENT
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/api/events/${id}`);

      alert("✅ Event Deleted");

      loadEvents();

    } catch (error) {

      console.log(error);
      alert("Error deleting event");

    }

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


  // FORMAT TIME
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

            {events.map((event) => (

              <tr key={event._id}>

                <td>
                  <img
                    src={event.image || "/default-event.png"}
                    alt={event.eventName}
                    className="event-icon"
                  />
                </td>

                <td>{event.eventName}</td>

                <td>{formatDate(event.date)}</td>

                <td>{formatTime(event.time)}</td>

                <td>{event.venue}</td>

                <td>{event.eventType}</td>

                <td>
                  {event.eventType === "Paid"
                    ? `₹${event.amount}`
                    : "-"}
                </td>

                <td className="action-buttons">

                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/admin/edit-event/${event._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(event._id)}
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