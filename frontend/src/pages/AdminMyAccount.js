import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/adminMyAccount.css";

const AdminMyAccount = () => {
  // Fetch existing credentials from localStorage (or fallback to defaults)
  const storedAdmin = JSON.parse(localStorage.getItem("adminCredentials")) || {
    username: "khushi",
    email: "khushi@gmail.com",
    password: "khushi123"
  };
  const storedPic = localStorage.getItem("adminProfilePic") || "";

  const [username, setUsername] = useState(storedAdmin.username);
  const [email, setEmail] = useState(storedAdmin.email);
  const [password, setPassword] = useState(storedAdmin.password);
  const [profilePic, setProfilePic] = useState(storedPic);

  const [showPass, setShowPass] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // ✅ Save updated credentials so that login only works with these
    const updatedAdmin = {
      username,
      email,
      password
    };
    localStorage.setItem("adminCredentials", JSON.stringify(updatedAdmin));

    // Save separate keys for admin panel display
    localStorage.setItem("adminUsername", username);
    localStorage.setItem("adminEmail", email);
    localStorage.setItem("adminPassword", password);
    localStorage.setItem("adminProfilePic", profilePic);

    alert("✅ Admin Profile Updated Successfully!");
    setIsEditing(false);
  };

  return (
    <div className="admin-profile-section">

      {!isEditing && (
        <>
          <div className="profile-pic-container">
            {profilePic ? (
              <img src={profilePic} className="profile-pic" alt="admin pic" />
            ) : (
              <div className="default-avatar">
                {username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h2>Admin Profile</h2>

          <div className="profile-card">
            <div className="profile-row">
              <span className="label">Username:</span>
              <span className="value">{username}</span>
            </div>

            <div className="profile-row">
              <span className="label">Email:</span>
              <span className="value">{email}</span>
            </div>

            <div className="profile-row password-row">
              <span className="label">Password:</span>
              <span className="value">
                {showPass ? password : "••••••••"}
                <span className="profile-eye" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </span>
            </div>

            <div className="profile-row">
              <span className="label">Role:</span>
              <span className="value">Admin</span>
            </div>
          </div>

          <button
            className="edit-profile-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </>
      )}

      {isEditing && (
        <div className="edit-profile-form">
          <input type="file" onChange={handleImageChange} />

          <input
            type="text"
            placeholder="New Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="New Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-input-wrapper">
            <input
              type={showPass ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="profile-eye-small"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button onClick={handleSave}>Save Changes</button>
        </div>
      )}

    </div>
  );
};

export default AdminMyAccount;