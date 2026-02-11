import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/addEvent.css";

const EditEvent = () => {
  const { index } = useParams();
  const navigate = useNavigate();

  const eventIndex = Number(index);
 
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [image, setImage] = useState("");

  // ✅ ADMIN CHECK + LOAD EVENT
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
      return;
    }

    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    if (!storedEvents[eventIndex]) {
      navigate("/admin/all-events");
      return;
    }

    setEvents(storedEvents);

    const event = storedEvents[eventIndex];
    setEventName(event.eventName || "");
    setEventType(event.eventType || "");
    setDate(event.date || "");
    setVenue(event.venue || "");
    setImage(event.image || "");
  }, [eventIndex, navigate]);

  // ✅ UPDATE EVENT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventName || !eventType || !date || !venue) {
      alert("All fields are required");
      return;
    }

    const updatedEvents = [...events];
    updatedEvents[eventIndex] = {
      eventName,
      eventType,
      date,
      venue,
      image,
    };

    localStorage.setItem("events", JSON.stringify(updatedEvents));
    navigate("/admin/all-events");
  };

  // ✅ IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="add-event-page">
      <h2>Edit Event</h2>

      <form className="add-event-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Event Type"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {/* ✅ IMAGE PREVIEW */}
        {image && (
          <img
            src={image}
            alt="Event Preview"
            style={{
              width: "120px",
              marginTop: "10px",
              borderRadius: "8px",
            }}
          />
        )} 

        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default EditEvent;