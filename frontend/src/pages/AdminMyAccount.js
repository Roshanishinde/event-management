import React, { useEffect, useState } from "react";
import "../styles/adminMyAccount.css";

const AdminMyAccount = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [currentUsername, setCurrentUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("adminUsername") || "admin";
    const savedPassword = localStorage.getItem("adminPassword") || "admin123";

    setCurrentUsername(savedUsername);
    setCurrentPassword(savedPassword);
  }, []);

  const handleUpdate = () => {
    if (!oldPassword) {
      alert("❌ Old Password is required");
      return;
    }

    if (oldPassword !== currentPassword) {
      alert("❌ Old password is incorrect");
      return;
    }

    if (!newPassword || !confirmPassword) {
      alert("❌ New Password and Confirm Password are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("❌ New passwords do not match");
      return;
    }

    if (!newUsername) {
      alert("❌ New Username is required");
      return;
    }

    localStorage.setItem("adminUsername", newUsername);
    localStorage.setItem("adminPassword", newPassword);

    setCurrentUsername(newUsername);
    setCurrentPassword(newPassword);

    setNewUsername("");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");

    alert("✅ Admin account updated successfully");
  };

  return (
    <div className="admin-account-page">
      <div className="admin-account-card">

        {/* HEADER */}
        <div className="admin-header">
          <h2>Admin Account Settings</h2>
          <p>Manage your account and security</p>
        </div>

        {/* CURRENT DETAILS */}
        <div className="admin-current-details">
          <div className="account-row">
            <span>Current Username</span>
            <strong>{currentUsername}</strong>
          </div>

          <div className="account-row password-row">
            <span>Current Password</span>

            <div className="password-eye-wrapper">
              <span className="password-text">
                {showCurrentPassword ? currentPassword : "••••••••"}
              </span>

              <i
                className={`fa-solid ${showCurrentPassword ? "fa-eye-slash" : "fa-eye"}`}
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                title={showCurrentPassword ? "Hide Password" : "Show Password"}
              ></i>
            </div>
          </div>
        </div>

        <hr />

        {/* UPDATE FORM */}
        <div className="admin-update-form">
          <h3>Update Account</h3>

          <div className="password-input-wrapper">
            <input
              type="text"
              placeholder="New Username *"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
          </div>

          <div className="password-input-wrapper">
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Old Password *"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <i
              className={`fa-solid ${showOldPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowOldPassword(!showOldPassword)}
            ></i>
          </div>

          <div className="password-input-wrapper">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password *"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <i
              className={`fa-solid ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowNewPassword(!showNewPassword)}
            ></i>
          </div>

          <div className="password-input-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password *"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <i
              className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            ></i>
          </div>

          <button onClick={handleUpdate}>
            Update Account
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminMyAccount;