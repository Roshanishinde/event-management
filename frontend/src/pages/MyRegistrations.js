import React, { useEffect, useState } from "react";
import "../styles/MyRegistrations.css";

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {api.post("/registrations", {
  eventId,
  eventName,
  firstName,
  middleName,
  lastName,
  className,
  division,
  contact,
  email
});}, []);
  useEffect(() => {
    const loggedUser = localStorage.getItem("studentUsername");

    const allRegs =
      JSON.parse(localStorage.getItem("registrations")) || [];

    const myRegs = allRegs.filter(
      (r) => r.user === loggedUser
    );

    setRegistrations(myRegs);
  }, []);

  const handleCancel = (email, eventId) => {
    if (!window.confirm("Cancel this registration?")) return;

    let allRegs =
      JSON.parse(localStorage.getItem("registrations")) || [];

    const updated = allRegs.filter(
      (r) =>
        !(r.email === email && r.eventId === eventId)
    );

    localStorage.setItem("registrations", JSON.stringify(updated));

    setRegistrations((prev) =>
      prev.filter(
        (r) =>
          !(r.email === email && r.eventId === eventId)
      )
    );

    alert("Registration Cancelled");
  };

  return (
    <div className="myreg-page">

      {registrations.length === 0 ? (
        <p>No registrations found.</p>
      ) : (
        <div className="reg-grid">
          {registrations.map((event, index) => (
            <div className="reg-card" key={index}>
              
              {/* Event Image */}
              <img
                src={event.eventImage}
                alt={event.eventName}
                className="reg-image"
              />

              <div className="reg-content">
                <h3>{event.eventName}</h3>

                <p>
                  <strong>Full Name:</strong>{" "}
                  {event.firstName} {event.middleName} {event.lastName}
                </p>

                <p><strong>Class:</strong> {event.className}</p>
                <p><strong>Division:</strong> {event.division}</p>
                <p><strong>Contact:</strong> {event.contact}</p>
                <p><strong>Email:</strong> {event.email}</p>

                <p>
                  <strong>Registered On:</strong>{" "}
                  {event.registeredAt
                    ? new Date(event.registeredAt)
                        .toLocaleDateString("en-IN")
                    : "N/A"}
                </p>

                <button
                  className="cancel-btn"
                  onClick={() =>
                    handleCancel(event.email, event.eventId)
                  }
                >
                  Cancel Registration
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;