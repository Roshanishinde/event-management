import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/adminEventStudents.css";

const AdminEventStudents = () => {
  const { id } = useParams(); // event id from URL
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Load students and event info
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
      return;
    }

    const allRegs = JSON.parse(localStorage.getItem("registrations")) || [];
    const events = JSON.parse(localStorage.getItem("events")) || [];

    const eventInfo = events[Number(id)]; // get current event
    setCurrentEvent(eventInfo);

    const filtered = allRegs.filter(r => r.eventId === Number(id));
    setStudents(filtered);

  }, [id, navigate]);

  // Approve student (Paid event)
  const handleApprove = (email) => {
    let allRegs = JSON.parse(localStorage.getItem("registrations")) || [];
    const updated = allRegs.map(r => {
      if (r.email === email && r.eventId === Number(id)) {
        return { ...r, status: "approved" };
      }
      return r;
    });
    localStorage.setItem("registrations", JSON.stringify(updated));
    setStudents(updated.filter(r => r.eventId === Number(id)));
  };

  // Reject student (Paid event)
  const handleReject = (email) => {
    let allRegs = JSON.parse(localStorage.getItem("registrations")) || [];
    const updated = allRegs.map(r => {
      if (r.email === email && r.eventId === Number(id)) {
        return { ...r, status: "rejected" };
      }
      return r;
    });
    localStorage.setItem("registrations", JSON.stringify(updated));
    setStudents(updated.filter(r => r.eventId === Number(id)));
  };

  // Delete student (Free or Paid)
  const handleDelete = (email) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    let allRegs = JSON.parse(localStorage.getItem("registrations")) || [];
    const updated = allRegs.filter(r => !(r.email === email && r.eventId === Number(id)));
    localStorage.setItem("registrations", JSON.stringify(updated));
    setStudents(updated.filter(r => r.eventId === Number(id)));
  };

  if (!currentEvent) return <h2 style={{ padding: "40px" }}>Event Not Found</h2>;

  return (
    <div className="event-students-page">
      <h2>{currentEvent.eventName} - Registered Students</h2>

      {students.length === 0 ? (
        <p>No students registered yet.</p>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Class</th>
              <th>Division</th>
              <th>Contact</th>
              <th>Email</th>

              {/* Paid event columns */}
              {currentEvent.eventType === "Paid" && (
                <>
                  <th>Screenshot</th>
                  <th>Status</th>
                  <th>Action</th>
                </>
              )}

              <th>Delete</th>
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

                {currentEvent.eventType === "Paid" && (
                  <>
                    <td>
                      {s.paymentProof ? (
                        <a href={s.paymentProof} target="_blank" rel="noreferrer">View</a>
                      ) : "No Screenshot"}
                    </td>
                    <td>{s.status || "Pending"}</td>
                    <td>
                      {s.status !== "approved" && (
                        <button className="approve-btn" onClick={() => handleApprove(s.email)}>Approve</button>
                      )}
                      {s.status !== "rejected" && (
                        <button className="reject-btn" onClick={() => handleReject(s.email)}>Reject</button>
                      )}
                    </td>
                  </>
                )}

                <td>
                  <button className="delete-btn" onClick={() => handleDelete(s.email)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminEventStudents;