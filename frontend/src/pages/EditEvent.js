import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/addEvent.css";
import api from "../api/axios";

const EditEvent = () => {

  const { id } = useParams(); // MongoDB event id
  const navigate = useNavigate();

  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(true);

  // LOAD EVENT FROM BACKEND
  useEffect(() => {

    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");
      return;
    }

    api.get(`/api/events/${id}`)
      .then(res => {

        const event = res.data;

        setEventName(event.eventName || "");
        setEventType(event.eventType || "");
        setAmount(event.amount || "");
        setDate(event.date || "");
        setTime(event.time || "");
        setVenue(event.venue || "");
        setImage(event.image || "");

        setLoading(false);

      })
      .catch(err => {
        console.log(err);
        alert("Event not found");
        navigate("/admin/all-events");
      });

  }, [id, navigate]);



  // UPDATE EVENT
  const handleSubmit = async (e) => {

    e.preventDefault();

    const updatedEvent = {
      eventName,
      eventType,
      amount: eventType === "Paid" ? amount : "",
      date,
      time,
      venue,
      image
    };

    try {

      await api.put(`/api/events/${id}`, updatedEvent);

      alert("✅ Event Updated Successfully!");

      navigate("/admin/all-events");

    } catch (error) {

      console.log(error);
      alert("❌ Error updating event");

    }

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


  if (loading) {
    return <h2 style={{textAlign:"center"}}>Loading Event...</h2>;
  }


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

        <select
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
            placeholder="Enter Amount"
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
        />

        {image && (
          <img
            src={image}
            alt="Event Preview"
            style={{
              width: "120px",
              marginTop: "10px",
              borderRadius: "8px"
            }}
          />
        )}

        <button type="submit">Update Event</button>

      </form>

    </div>
  );
};

export default EditEvent;