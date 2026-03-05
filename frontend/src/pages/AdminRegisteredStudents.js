import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/adminRegisteredStudents.css";

const AdminRegisteredStudents = () => {
  const { eventId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const allRegs =
      JSON.parse(localStorage.getItem("registrations")) || [];

    const filtered = allRegs.filter(
      (r) => r.eventId === Number(eventId)
    );

    setStudents(filtered);
  }, [eventId]);

  const handleDelete = (email, eventId) => {
    if (!window.confirm("Delete this student?")) return;

    let allRegs =
      JSON.parse(localStorage.getItem("registrations")) || [];

    const updated = allRegs.filter(
      (r) =>
        !(r.email === email && r.eventId === eventId)
    );

    localStorage.setItem("registrations", JSON.stringify(updated));

    setStudents(updated.filter((r) => r.eventId === Number(eventId)));
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
       

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
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                 
                  <td>{s.firstName} {s.middleName} {s.lastName}</td>
                  <td>{s.className}</td>
                  <td>{s.division}</td>
                  <td>{s.contact}</td>
                  <td>{s.email}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(s.email, s.eventId)
                      }
                    >
                      Delete
                    </button>
                  </td>
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