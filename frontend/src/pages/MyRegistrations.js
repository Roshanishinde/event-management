import React, { useEffect, useState } from "react";
import "./MyRegistrations.css";

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const loggedUser = localStorage.getItem("adminUsername") || "student";
    const allRegs = JSON.parse(localStorage.getItem("myRegistrations")) || [];

    const userRegs = allRegs.filter(reg => reg.user === loggedUser);
    setRegistrations(userRegs);
  }, []);

  return (
    <div className="my-reg-page">
      <h2>My Event Registrations</h2>

      {registrations.length === 0 ? (
        <p className="no-reg">No event registrations found.</p>
      ) : (
        <div className="reg-grid">
          {registrations.map((event, index) => (
            <div className="reg-card" key={index}>
              <img src={event.image} alt={event.title} />

              <div className="reg-content">
                <h3>{event.title}</h3>
                <p><b>Date:</b> {event.date}</p>
                <p><b>Location:</b> {event.location}</p>
                <p className="desc">{event.description}</p>

                <div className="reg-footer">
                  <span>Registered</span>
                  <small>
                    {new Date(event.registeredAt).toLocaleString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRegistrations;