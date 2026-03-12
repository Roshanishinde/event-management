import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/adminEventStudents.css";

const AdminEventStudents = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/");
      return;
    }

    loadEventAndStudents();
  }, [id, navigate]);

  const loadEventAndStudents = async () => {
    try {
      setLoading(true);

      const [eventRes, studentRes] = await Promise.all([
        api.get(`/api/events/${id}`),
        api.get(`/api/registrations/event/${id}`),
      ]);

      setCurrentEvent(eventRes.data);
      setStudents(studentRes.data);
    } catch (error) {
      console.log("Error loading event students:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (regId) => {
    try {
      await api.put(`/api/registrations/${regId}`, {
        status: "approved",
      });

      loadEventAndStudents();
    } catch (error) {
      console.log("Approve error:", error);
    }
  };

  const handleReject = async (regId) => {
    try {
      await api.put(`/api/registrations/${regId}`, {
        status: "rejected",
      });

      loadEventAndStudents();
    } catch (error) {
      console.log("Reject error:", error);
    }
  };

  const handleDelete = async (regId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student registration?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/registrations/${regId}`);
      loadEventAndStudents();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  if (loading) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

  if (!currentEvent) {
    return <h2 style={{ padding: "40px" }}>Event Not Found</h2>;
  }

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
              <tr key={s._id}>
                <td>{index + 1}</td>
                <td>
                  {s.firstName} {s.middleName} {s.lastName}
                </td>
                <td>{s.className}</td>
                <td>{s.division}</td>
                <td>{s.contact}</td>
                <td>{s.email}</td>

                {currentEvent.eventType === "Paid" && (
                  <>
                    <td>
                      {s.paymentProof ? (
                        <a href={s.paymentProof} target="_blank" rel="noreferrer">
                          View
                        </a>
                      ) : (
                        "No Screenshot"
                      )}
                    </td>

                    <td>{s.status || "Pending"}</td>

                    <td>
                      {s.status !== "approved" && (
                        <button
                          className="approve-btn"
                          onClick={() => handleApprove(s._id)}
                        >
                          Approve
                        </button>
                      )}

                      {s.status !== "rejected" && (
                        <button
                          className="reject-btn"
                          onClick={() => handleReject(s._id)}
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </>
                )}

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(s._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/admin/registered-events")}
      >
        Back
      </button>
    </div>
  );
};

export default AdminEventStudents;