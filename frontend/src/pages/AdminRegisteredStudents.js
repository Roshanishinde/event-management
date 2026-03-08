import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/adminRegisteredStudents.css";

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

    const allRegs = JSON.parse(localStorage.getItem("registrations")) || [];
    const events = JSON.parse(localStorage.getItem("events")) || [];

    const event = events[Number(eventId)];
    setEventInfo(event);

    const filtered = allRegs.filter(
      (r) => r.eventId === Number(eventId)
    );

    setStudents(filtered);

  }, [eventId, navigate]);


  // STATUS CHANGE
  const handleStatusChange = (email, status) => {

    let allRegs = JSON.parse(localStorage.getItem("registrations")) || [];

    const updated = allRegs.map((r) => {
      if (r.email === email && r.eventId === Number(eventId)) {
        return { ...r, status };
      }
      return r;
    });

    localStorage.setItem("registrations", JSON.stringify(updated));

    const filtered = updated.filter(
      (r) => r.eventId === Number(eventId)
    );

    setStudents(filtered);


    /* SAVE PERSONAL NOTIFICATION */

    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    const message =
      status === "approved"
        ? `✅ Your registration for "${eventInfo.eventName}" has been Approved`
        : `❌ Your registration for "${eventInfo.eventName}" has been Rejected`;

    notifications.push({
      id: Date.now(),
      message: message,
      date: new Date().toISOString(),
      read: false,
      type: "personal",
      user: email,
      eventId: Number(eventId)
    });

    localStorage.setItem("notifications", JSON.stringify(notifications));
  };


  // DELETE STUDENT
  const handleDelete = (email) => {

    if (!window.confirm("Delete this student?")) return;

    let allRegs = JSON.parse(localStorage.getItem("registrations")) || [];

    const updated = allRegs.filter(
      (r) => !(r.email === email && r.eventId === Number(eventId))
    );

    localStorage.setItem("registrations", JSON.stringify(updated));

    const filtered = updated.filter(
      (r) => r.eventId === Number(eventId)
    );

    setStudents(filtered);
  };


  if (!eventInfo) {
    return <h2 style={{ padding: "40px" }}>Event not found</h2>;
  }

  return (

    <div className="admin-page">

      <div className="admin-container">

     

        {students.length === 0 ? (
          <p>No students registered yet.</p>
        ) : (
          <>

            {/* FREE EVENT */}

            {eventInfo.eventType === "Free" && (

              <table className="admin-table">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Division</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>

                  {students.map((s, index) => (

                    <tr key={index}>

                      <td>{index + 1}</td>

                      <td>
                        {s.firstName} {s.middleName} {s.lastName}
                      </td>

                      <td>{s.className}</td>

                      <td>{s.division}</td>

                      <td>{s.contact}</td>

                      <td>{s.email}</td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(s.email)}
                        >
                          Delete
                        </button>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}


            {/* PAID EVENT */}

            {eventInfo.eventType === "Paid" && (

              <table className="admin-table">

                <thead>

                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Division</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Receipt</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {students.map((s, index) => (

                    <tr key={index}>

                      <td>{index + 1}</td>

                      <td>
                        {s.firstName} {s.middleName} {s.lastName}
                      </td>

                      <td>{s.className}</td>

                      <td>{s.division}</td>

                      <td>{s.contact}</td>

                      <td>{s.email}</td>

                      {/* RECEIPT */}

                      <td>

                        {s.paymentProof ? (

                          <button
                            className="screenshot-btn"
                            onClick={() => setModalImg(s.paymentProof)}
                          >
                            View
                          </button>

                        ) : (
                          "No Screenshot"
                        )}

                      </td>

                      {/* STATUS */}

                      <td>

                        {s.status === "Approved" ? (

                          <button className="approve-btn active">
                            Approved
                          </button>

                        ) : s.status === "Rejected" ? (

                          <button className="reject-btn active">
                            Reject
                          </button>

                        ) : (

                          <div className="status-btns">

                            <button
                              className="approve-btn"
                              onClick={() =>
                                handleStatusChange(s.email, "Approved")
                              }
                            >
                              Approved
                            </button>

                            <button
                              className="reject-btn"
                              onClick={() =>
                                handleStatusChange(s.email, "rejected")
                              }
                            >
                              Reject
                            </button>

                          </div>

                        )}

                      </td>

                      {/* DELETE */}

                      <td>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(s.email)}
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </>
        )}

        {/* RECEIPT MODAL */}

        {modalImg && (

          <div
            className="modal-overlay"
            onClick={() => setModalImg(null)}
          >

            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >

              <img src={modalImg} alt="Receipt" />

              <button
                className="delete-btn"
                style={{ marginTop: "10px" }}
                onClick={() => setModalImg(null)}
              >
                Close
              </button>

            </div>

          </div>

        )}

      </div>

    </div>

  );
};

export default AdminRegisteredStudents;