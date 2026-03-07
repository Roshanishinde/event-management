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

  const [paymentScreenshot, setPaymentScreenshot] = useState("");

  if (!event) return <h2>Event Not Found</h2>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // PAYMENT SCREENSHOT UPLOAD
  const handlePaymentUpload = (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPaymentScreenshot(reader.result);
    };

    reader.readAsDataURL(file);
  };


  const handleSubmit = (e) => {

    e.preventDefault();

    // PAID EVENT VALIDATION
    if (event.eventType === "Paid" && !paymentScreenshot) {
      alert("⚠ Please upload payment screenshot");
      return;
    }

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
      paymentProof: paymentScreenshot,
      ...formData,
      registeredAt: new Date().toISOString(),
    };

    registrations.push(newRegistration);

    localStorage.setItem(
      "registrations",
      JSON.stringify(registrations)
    );

    // NOTIFICATION
    let savedNoti =
      JSON.parse(localStorage.getItem("notifications")) || [];

    savedNoti.push({
      id: Date.now(),
      title: "Event Registration",
      message: `🎟 You registered for "${event.eventName}"`,
      details: `Event: ${event.eventName}
Date: ${event.date}
Venue: ${event.venue}`,
      date: new Date().toISOString(),
      read: false,
      type: "personal",
      user: loggedUser
    });

    localStorage.setItem(
      "notifications",
      JSON.stringify(savedNoti)
    );

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


            {/* PAYMENT SCREENSHOT ONLY FOR PAID EVENTS */}
            {event.eventType === "Paid" && (
              <div className="payment-upload">

                <label>Upload Payment Screenshot *</label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePaymentUpload}
                />

                {paymentScreenshot && (
                  <img
                    src={paymentScreenshot}
                    alt="Payment Proof"
                    style={{
                      width: "120px",
                      marginTop: "10px",
                      borderRadius: "6px"
                    }}
                  />
                )}

              </div>
            )}


            <button type="submit">
              Register
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EventRegister;
