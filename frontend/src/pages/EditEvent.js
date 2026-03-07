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
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [image, setImage] = useState("");

  // LOAD EVENT
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
    setAmount(event.amount || "");
    setDate(event.date || "");
    setTime(event.time || "");
    setVenue(event.venue || "");
    setImage(event.image || "");

  }, [eventIndex, navigate]);



  // UPDATE EVENT
  const handleSubmit = (e) => {

    e.preventDefault();

    if (!eventName || !eventType || !date || !time || !venue) {
      alert("All fields are required");
      return;
    }

    const updatedEvents = [...events];

    updatedEvents[eventIndex] = {
      eventName,
      eventType,
      amount: eventType === "Paid" ? amount : "",
      date,
      time,
      venue,
      image,
    };

    localStorage.setItem("events", JSON.stringify(updatedEvents));


    // NOTIFICATION
    let notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.push({
      id: Date.now(),
      title: "Event Updated",
      message: `✏️ Event updated: "${eventName}"`,
      type: "global",
      user: "",
      read: false,
      date: new Date().toISOString(),
    });

    localStorage.setItem("notifications", JSON.stringify(notifications));

    alert("✅ Event Updated Successfully!");

    navigate("/admin/all-events");
  };



  // IMAGE CHANGE
  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };



  return (

    <div className="add-event-page">

      <h2>Edit Event</h2>

      <form className="add-event-form" onSubmit={handleSubmit}>

        {/* EVENT NAME */}
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />


        {/* EVENT TYPE */}
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          required
        >
          <option value="">Select Event Type</option>
          <option value="Free">Free</option>
          <option value="Paid">Paid</option>
        </select>


        {/* AMOUNT (ONLY FOR PAID) */}
        {eventType === "Paid" && (
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        )}


        {/* DATE */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />


        {/* TIME */}
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />


        {/* VENUE */}
        <input
          type="text"
          placeholder="Venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          required
        />


        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />



        {/* IMAGE PREVIEW */}
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