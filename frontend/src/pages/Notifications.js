import React, { useEffect, useState } from "react";
import "../styles/notifications.css";

const Notifications = () => {
  const loggedUser = localStorage.getItem("studentUsername");
  const [notifications, setNotifications] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const allNoti = JSON.parse(localStorage.getItem("notifications")) || [];
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const registrations = JSON.parse(localStorage.getItem("registrations")) || [];
    const now = new Date();
    let deadlineNoti = [];

    // Generate deadline notifications
    events.forEach((ev, index) => {
      if (ev.date) {
        const diffDays = Math.floor((new Date(ev.date) - now) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays <= 3) {
          const exists = allNoti.find(
            (n) => n.type === "deadline" && n.eventId === index && n.user === ""
          );
          if (!exists) {
            deadlineNoti.push({
              id: Date.now() + Math.random(),
              message: `⏰ Deadline: "${ev.eventName}" in ${diffDays} day${diffDays > 1 ? "s" : ""}`,
              date: new Date().toISOString(),
              read: false,
              type: "deadline",
              user: "",
              details: `Event: ${ev.eventName}\nDate: ${ev.date}\nVenue: ${ev.venue || "N/A"}`
            });
          }
        }
      }
    });

    const updated = [...allNoti, ...deadlineNoti];
    if (deadlineNoti.length > 0) localStorage.setItem("notifications", JSON.stringify(updated));

    // Enrich notifications
    const enriched = updated.map((n) => {
      // Admin notifications: show message as details if not present
      if (n.type === "global" && !n.details) {
        return { ...n, details: n.message };
      }

      // Personal notifications: attach registeredOn
      if (n.type === "personal" && n.user) {
        const reg = registrations.find(
          (r) => r.email === n.user && r.eventId === n.eventId
        );
        return { ...n, registeredOn: reg ? reg.registeredOn : null };
      }

      return n;
    });

    // Filter notifications
    const filtered = enriched.filter((n) => {
      if (n.type === "global") return true; // Admin notifications
      if (n.type === "personal" && n.user === loggedUser) return true; // Personal
      if (n.type === "deadline") return true; // Deadline
      return false;
    });

    setNotifications(filtered.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, [loggedUser]);

  const markAsRead = (id) => {
    const all = JSON.parse(localStorage.getItem("notifications")) || [];
    const updatedAll = all.map((n) => (n.id === id ? { ...n, read: true } : n));
    localStorage.setItem("notifications", JSON.stringify(updatedAll));
    setNotifications(
      updatedAll.filter((n) => {
        if (n.type === "global") return true;
        if (n.type === "personal" && n.user === loggedUser) return true;
        if (n.type === "deadline") return true;
        return false;
      })
    );
  };

  const deleteNotification = (id) => {
    const all = JSON.parse(localStorage.getItem("notifications")) || [];
    const updatedAll = all.filter((n) => n.id !== id);
    localStorage.setItem("notifications", JSON.stringify(updatedAll));
    setNotifications(
      updatedAll.filter((n) => {
        if (n.type === "global") return true;
        if (n.type === "personal" && n.user === loggedUser) return true;
        if (n.type === "deadline") return true;
        return false;
      })
    );
  };

  const getRelativeTime = (date) => {
    const now = new Date();
    const diffMins = Math.floor((now - new Date(date)) / (1000 * 60));
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs} hr ago`;
    return `${Math.floor(diffHrs / 24)} day${Math.floor(diffHrs / 24) > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="notifications-page">
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <div className="noti-list">
          {notifications.map((n) => (
            <div key={n.id} className={`noti-card ${n.read ? "read" : "unread"}`}>
              <div
                style={{ cursor: "pointer", fontWeight: n.read ? "normal" : "bold" }}
                onClick={() => setSelectedId(selectedId === n.id ? null : n.id)}
              >
                {n.message}
              </div>
              <small>{getRelativeTime(n.date)}</small>
              <div className="noti-actions" style={{ marginTop: "5px" }}>
                {!n.read && <button onClick={() => markAsRead(n.id)}>Mark as Read</button>}
                <button onClick={() => deleteNotification(n.id)}>Delete</button>
              </div>

              {selectedId === n.id && (
                <div
                  style={{
                    whiteSpace: "pre-line",
                    marginTop: "5px",
                    paddingLeft: "10px",
                    fontSize: "0.9em"
                  }}
                >
                
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;