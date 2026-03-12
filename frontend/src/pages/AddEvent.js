import React, { useState } from "react";
import "../styles/addEvent.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AddEvent = () => {

  const navigate = useNavigate();

  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      eventName,
      eventType,
      amount,
      date,
      time,
      venue,
      image,
      createdAt: new Date().toISOString(),
    };

    try {
      await api.post("/api/events", newEvent);

      let notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

      const newNotification = {
        id: Date.now(),
        title: "New Event Added",
        message: `📢 New event added: "${eventName}"`,
        eventName: eventName,
        type: "global",
        user: "",
        read: false,
        date: new Date().toISOString(),
      };

      notifications.push(newNotification);

      localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
      );

      alert("🎉 Event Added Successfully!");

      navigate("/events");

    } catch (error) {
      console.error("Error adding event:", error);
      alert("Error adding event");
    }
  };

  return (
    <div className="add-event-page">

      <h2>Add New Event</h2>

      <form className="add-event-form" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />

        <select
          className="event-select"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          required
        >
          <option value="">Select Event Type</option>
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>

        {eventType === "Paid" && (
          <input
            type="number"
            placeholder="Enter Event Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        )}

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <button type="submit">Add Event</button>

      </form>

    </div>
  );
};

export default AddEvent;