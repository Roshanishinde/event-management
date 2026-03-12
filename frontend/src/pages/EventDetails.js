import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/eventDetails.css";
import api from "../api/axios";

const EventDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  useEffect(() => {

    api.get(`/api/events`)
      .then(res => {
        const foundEvent = res.data.find(e => e._id === id);
        setEvent(foundEvent);
      })
      .catch(err => console.log(err));

  }, [id]);

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (!event) {
    return <h2 style={{ textAlign: "center" }}>Loading Event...</h2>;
  }

  return (
    <div className="event-details-container">

      <div className="event-details-card">

        <div className="event-image-box">
          <img src={event.image} alt={event.eventName} />
        </div>

        <div className="event-info">

          <h2>{event.eventName}</h2>

          <p><b>Type:</b> {event.eventType}</p>

          {event.eventType === "Paid" && (
            <p><b>Amount:</b> ₹{event.amount}</p>
          )}

          <p><b>Date:</b> {formatDate(event.date)}</p>

          <p><b>Time:</b> {event.time}</p>

          <p><b>Venue:</b> {event.venue}</p>

          {!isLoggedIn && (
            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Login to Register
            </button>
          )}

          {isLoggedIn === "true" && role === "student" && (
            <button
              className="enroll-btn"
            onClick={() => navigate(`/events/${id}/register`)}
            >
              Register Now
            </button>
          )}

        </div>

      </div>

    </div>
  );
};

export default EventDetails;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "../styles/eventDetails.css";
// import api from "../api/axios";

// const EventDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [event, setEvent] = useState(null);

//   const isLoggedIn = localStorage.getItem("isLoggedIn");
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     api.get("/events")
//       .then(res => {
//         const foundEvent = res.data.find(e => e._id === id);
//         setEvent(foundEvent);
//       })
//       .catch(err => console.log(err));
//   }, [id]);

//   if (!event) return <h2 style={{ textAlign: "center" }}>Loading Event...</h2>;

//   return (
//     <div className="event-details-container">
//       <div className="event-details-card">
//         <div className="event-image-box">
//           <img src={event.image} alt={event.eventName} />
//         </div>
//         <div className="event-info">
//           <h2>{event.eventName}</h2>
//           <p><b>Type:</b> {event.eventType}</p>
//           {event.eventType === "Paid" && <p><b>Amount:</b> ₹{event.amount}</p>}
//           <p><b>Date:</b> {new Date(event.date).toLocaleDateString("en-IN")}</p>
//           <p><b>Time:</b> {event.time}</p>
//           <p><b>Venue:</b> {event.venue}</p>

//           {!isLoggedIn && (
//             <button className="login-btn" onClick={() => navigate("/login")}>
//               Login to Register
//             </button>
//           )}

//           {isLoggedIn === "true" && role === "student" && (
//             <button className="enroll-btn" onClick={() => navigate(`/events/${id}/register`)}>
//               Register Now
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetails;