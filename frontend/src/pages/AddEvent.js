import React, { useState } from "react";
import "../styles/addEvent.css";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate();
 
  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64 image
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      eventName,
      eventType,
      date,
      venue,
      image,
    };

    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(newEvent);
    localStorage.setItem("events", JSON.stringify(events));

    navigate("/events");
  };

  return (
    <div className="add-event-page">
      <h2>Add New Event</h2>

      <form className="add-event-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Event Name"
          required
          onChange={(e) => setEventName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Event Type (Party, Traditional, Tech)"
          required
          onChange={(e) => setEventType(e.target.value)}
        />

        <input
          type="date"
          required
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Venue"
          required
          onChange={(e) => setVenue(e.target.value)}
        />

       

        <input
          type="file"
          accept="image/*"
          required
          onChange={handleImageChange}
        />

        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};
  
export default AddEvent;