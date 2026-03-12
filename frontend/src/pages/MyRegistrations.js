import React, { useEffect, useState } from "react";
import "../styles/MyRegistrations.css";
import api from "../api/axios";

const MyRegistrations = () => {

  const [registrations, setRegistrations] = useState([]);

  const loggedUser = localStorage.getItem("studentUsername");

  useEffect(() => {

    const url = `/api/students/user/${loggedUser}`;
console.log("Fetching:", url);

api.get(url)
  .then(res => setRegistrations(res.data))
  .catch(err => console.log(err));


    if (!loggedUser) return;

    api.get(`/api/registrations/user/${loggedUser}`)
  .then(res => {
    console.log("User registrations:", res.data);
    setRegistrations(res.data);
  })
  .catch(err => console.log(err));


  }, [loggedUser]);



  const handleCancel = async (id) => {

    if (!window.confirm("Cancel this registration?")) return;

    try {

      await api.delete(`/api/registrations/${id}`);

      setRegistrations(prev =>
        prev.filter(reg => reg._id !== id)
      );

      alert("Registration Cancelled");

    } catch (err) {

      console.log(err);

    }

  };



  return (
    <div className="myreg-page">

      {registrations.length === 0 ? (

        <p className="no-reg">No registrations found.</p>

      ) : (

        <div className="reg-grid">

          {registrations.map((event) => (

            <div className="reg-card" key={event._id}>

              <img
                src={event.eventImage}
                alt={event.eventName}
                className="reg-image"
              />

              <div className="reg-content">

                <h3>{event.eventName}</h3>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status ${event.status?.toLowerCase()}`}>
                    {event.status || "Pending"}
                  </span>
                </p>

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
                    ? new Date(event.registeredAt).toLocaleDateString("en-IN")
                    : "N/A"}
                </p>

                {event.paymentProof && (
                  <div className="payment-proof">
                    <p><strong>Payment Screenshot:</strong></p>
                    <img
                      src={event.paymentProof}
                      alt="Payment Proof"
                      className="payment-img"
                    />
                  </div>
                )}

                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(event._id)}
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