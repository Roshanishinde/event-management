import React, { useEffect, useState } from "react";
import "../styles/notifications.css";

const Notifications = () => {
  const loggedUser = localStorage.getItem("studentUsername");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // load all notifications
    const allNoti = JSON.parse(localStorage.getItem("notifications")) || [];

    // generate deadline reminders
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const now = new Date();
    let deadlineNoti = [];

    events.forEach((ev, index) => {
      if (ev.date) {
        const eventDate = new Date(ev.date);
        const diffDays = Math.floor((eventDate - now) / (1000 * 60 * 60 * 24));

        // if event is within next 3 days (and not past)
        if (diffDays >= 0 && diffDays <= 3) {
          const alreadyExists = allNoti.find(
            (n) =>
              n.type === "deadline" &&
              n.eventId === index &&
              n.user === ""
          );

          if (!alreadyExists) {
            deadlineNoti.push({
              id: Date.now() + Math.random(),
              message: `⏰ Deadline Soon: "${ev.eventName}" in ${diffDays} day${diffDays > 1 ? "s" : ""}`,
              date: new Date().toISOString(),
              read: false,
              type: "deadline",
              user: ""
            });
          }
        }
      }
    });

    const updatedNoti = [...allNoti, ...deadlineNoti];
    if (deadlineNoti.length > 0) {
      localStorage.setItem("notifications", JSON.stringify(updatedNoti));
    }

    const saved =
      JSON.parse(localStorage.getItem("notifications")) || [];

    const filtered = saved.filter(
      (n) =>
        n.type === "global" || (n.type === "personal" && n.user === loggedUser) || n.type === "deadline"
    );

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    setNotifications(filtered);
  }, []);

  const markAsRead = (id) => {
    const all = JSON.parse(localStorage.getItem("notifications")) || [];

    const updatedAll = all.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );

    localStorage.setItem("notifications", JSON.stringify(updatedAll));
    setNotifications(
      updatedAll.filter(
        (n) =>
          n.type === "global" ||
          (n.type === "personal" && n.user === loggedUser) ||
          n.type === "deadline"
      )
    );
  };

  const deleteNotification = (id) => {
    const all = JSON.parse(localStorage.getItem("notifications")) || [];

    const updatedAll = all.filter((n) => n.id !== id);

    localStorage.setItem("notifications", JSON.stringify(updatedAll));
    setNotifications(
      updatedAll.filter(
        (n) =>
          n.type === "global" ||
          (n.type === "personal" && n.user === loggedUser) ||
          n.type === "deadline"
      )
    );
  };

  const getRelativeTime = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffMins = Math.floor(diffMs / (1000 * 60));
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs} hr ago`;
    const diffDays = Math.floor(diffHrs / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <div className="noti-list">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`noti-card ${n.read ? "read" : "unread"}`}
            >
              <p>{n.message}</p>

              <small>{getRelativeTime(n.date)}</small>

              <div className="noti-actions">
                {!n.read && (
                  <button
                    className="mark-read-btn"
                    onClick={() => markAsRead(n.id)}
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  className="delete-btn"
                  onClick={() => deleteNotification(n.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;