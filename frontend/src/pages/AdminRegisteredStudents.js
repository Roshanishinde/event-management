import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/adminRegisteredStudents.css";

const AdminRegisteredStudents = () => {
  const { eventId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const registrations =
      JSON.parse(localStorage.getItem("registrations")) || [];

    const filtered = registrations.filter(
      (r) => r.eventId === Number(eventId)
    );

    setStudents(filtered);
  }, [eventId]);

  const handleDelete = (email) => {
    if (!window.confirm("Delete this student?")) return;

    const registrations =
      JSON.parse(localStorage.getItem("registrations")) || [];

    const updated = registrations.filter(
      (r) =>
        !(
          r.eventId === Number(eventId) &&
          r.email === email
        )
    );

    localStorage.setItem("registrations", JSON.stringify(updated));
    setStudents((prev) => prev.filter((s) => s.email !== email));
  };

  if (students.length === 0) {
    return <h2 style={{ padding: 40 }}>No students registered</h2>;
  }

  return (
    <div className="admin-students-page">
      <h2>Registered Students</h2>

      <table className="students-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Class</th>
            <th>Div</th>
            <th>Contact No</th>
            <th>Email ID</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{s.firstName} {s.middleName} {s.lastName}</td>
              <td>{s.className}</td>
              <td>{s.division}</td>
              <td>{s.contact}</td>
              <td>{s.email}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(s.email)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRegisteredStudents;