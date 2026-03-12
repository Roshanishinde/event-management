import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/eventRegister.css";
import api from "../api/axios";

const EventRegister = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
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

  // ❗ FETCH EVENT FROM BACKEND
  useEffect(() => {
    api
      .get(`/api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!event) return <h2>Event Not Found</h2>;

  // FORM INPUT HANDLER
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // PAYMENT SCREENSHOT UPLOAD
  const handlePaymentUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPaymentScreenshot(reader.result);
    reader.readAsDataURL(file);
  };

  // SUBMIT FUNCTION (FINAL)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // PAID EVENT VALIDATION
    if (event.eventType === "Paid" && !paymentScreenshot) {
      alert("⚠ Please upload payment screenshot");
      return;
    }

    const newRegistration = {
  user: loggedUser,
  eventId: id,
  eventName: event.eventName,
  eventImage: event.image,
  paymentProof: paymentScreenshot,
  ...formData,
  registeredAt: new Date(),
};

try{
await api.post("/api/registrations", newRegistration);
      alert("🎉 Registration Successful!");
      navigate("/student-dashboard");
    } catch (err) {
      console.log(err);
      alert("Error while registering!");
    }
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
            <input name="firstName" placeholder="First Name *" required onChange={handleChange} />

            <input name="middleName" placeholder="Middle Name" onChange={handleChange} />

            <input name="lastName" placeholder="Last Name *" required onChange={handleChange} />

            <input name="className" placeholder="Class *" required onChange={handleChange} />

            <input name="division" placeholder="Division *" required onChange={handleChange} />

            <input
              name="contact"
              placeholder="Contact No *"
              type="tel"
              pattern="[0-9]{10}"
              maxLength="10"
              required
              onChange={handleChange}
            />

            <input name="email" type="email" placeholder="Email *" required onChange={handleChange} />

            {/* SHOW PAYMENT UPLOAD IF EVENT IS PAID */}
            {event.eventType === "Paid" && (
              <div className="payment-upload">
                <label>Upload Payment Screenshot *</label>
                <input type="file" accept="image/*" onChange={handlePaymentUpload} />

                {paymentScreenshot && (
                  <img
                    src={paymentScreenshot}
                    alt="Payment Proof"
                    style={{ width: "120px", marginTop: "10px", borderRadius: "6px" }}
                  />
                )}
              </div>
            )}

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventRegister;
