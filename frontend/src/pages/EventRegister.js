import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/eventRegister.css";

const EventRegister = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const events = JSON.parse(localStorage.getItem("events")) || [];
  const event = events[id];

  const loggedUser = localStorage.getItem("studentUsername");

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    className: "",
    division: "",
    contact: "",
    email: "",
  });

  if (!event) return <h2>Event Not Found</h2>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let registrations =
      JSON.parse(localStorage.getItem("registrations")) || [];

    const already = registrations.find(
      (r) =>
        r.eventId === Number(id) &&
        r.email === formData.email
    );

    if (already) {
      alert("⚠ Already registered for this event!");
      return;
    }

    const newRegistration = {
      user: loggedUser,
      eventId: Number(id),
      eventName: event.eventName,
      eventImage: event.image,
      ...formData,
      registeredAt: new Date().toISOString(),
    };

    registrations.push(newRegistration);

    localStorage.setItem(
      "registrations",
      JSON.stringify(registrations)
    );

    // ⭐ CREATE A NOTIFICATION FOR THIS REGISTRATION ⭐
    let savedNoti = JSON.parse(localStorage.getItem("notifications")) || [];

    savedNoti.push({
      id: Date.now(),
      message: `You registered for "${event.eventName}"`,
      date: new Date().toISOString(),
      read: false,
    });

    localStorage.setItem("notifications", JSON.stringify(savedNoti));

    alert("🎉 Registration Successful!");
    navigate("/student-dashboard");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-left">
          <img src={event.image} alt={event.eventName} />
        </div>

        <div className="register-right">
          <h2>{event.eventName} Registration</h2>

          <form className="register-form" onSubmit={handleSubmit}>
            <input
              name="firstName"
              placeholder="First Name *"
              required
              onChange={handleChange}
            />
            <input
              name="middleName"
              placeholder="Middle Name"
              onChange={handleChange}
            />
            <input
              name="lastName"
              placeholder="Last Name *"
              required
              onChange={handleChange}
            />
            <input
              name="className"
              placeholder="Class *"
              required
              onChange={handleChange}
            />
            <input
              name="division"
              placeholder="Division *"
              required
              onChange={handleChange}
            />
            <input
              name="contact"
              placeholder="Contact No *"
              type="tel"
              pattern="[0-9]{10}"
              maxLength="10"
              required
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Email *"
              required
              onChange={handleChange}
            />

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventRegister;
