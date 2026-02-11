import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/adminEventStudents.css";

const AdminEventStudents = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [eventName, setEventName] = useState("");
 
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
      return;
    }

    const registrations =
      JSON.parse(localStorage.getItem("registrations")) || [];

    const filtered = registrations.filter(
      (r) => r.eventId === id
    );

    setStudents(filtered);

    if (filtered.length > 0) {
      setEventName(filtered[0].eventName);
    }
  }, [id, navigate]);

  return (
    <div className="event-students-page">
      <h2>{eventName} - Registered Students</h2>

      {students.length === 0 ? (
        <p>No students registered</p>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Division</th>
              <th>Contact</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, index) => (
              <tr key={index}>
                <td>
                  {s.firstName} {s.middleName} {s.lastName}
                </td>
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
  );
};

export default AdminEventStudents;