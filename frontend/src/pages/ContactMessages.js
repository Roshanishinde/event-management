import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/contactMessages.css";

const ContactMessages = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  // Admin protection
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
    } else {
      const storedMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];
      setMessages(storedMessages.reverse()); // show latest first
    }
  }, [navigate]);

  // Delete a message by index
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      const storedMessages = JSON.parse(localStorage.getItem("contactMessages")) || [];
      storedMessages.splice(storedMessages.length - 1 - index, 1); // delete correct message
      localStorage.setItem("contactMessages", JSON.stringify(storedMessages));
      setMessages(storedMessages.reverse());
    }
  };

  return (
    <div className="contact-messages-page">
      
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <table className="messages-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{msg.date}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
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
  );
};

export default ContactMessages;