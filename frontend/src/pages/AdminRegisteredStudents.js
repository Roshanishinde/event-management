// src/pages/AdminRegisteredStudents.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/adminRegisteredStudents.css";
import api from "../api/axios";

const AdminRegisteredStudents = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [eventInfo, setEventInfo] = useState(null);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
      return;
    }

    // Fetch event info from backend
    api.get("/events")
      .then(res => {
        const event = res.data.find(e => e._id === eventId);
        setEventInfo(event);
      })
      .catch(err => console.log(err));

    // Fetch registrations and filter by event
    api.get("/registrations")
      .then(res => {
        const filtered = res.data.filter(r => r.eventId === eventId);
        setStudents(filtered);
      })
      .catch(err => console.log(err));

  }, [eventId, navigate]);

  if (!eventInfo) {
    return <h2 style={{ padding: "40px" }}>Loading event...</h2>;
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h2>{eventInfo.eventName} - Registered Students</h2>

        {students.length === 0 ? (
          <p>No students registered yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Class</th>
                <th>Division</th>
                <th>Contact</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, index) => (
                <tr key={s.email}>
                  <td>{index + 1}</td>
                  <td>{s.firstName} {s.middleName} {s.lastName}</td>
                  <td>{s.className}</td>
                  <td>{s.division}</td>
                  <td>{s.contact}</td>
                  <td>{s.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminRegisteredStudents;