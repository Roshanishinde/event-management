import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/studentProfile.css"; 

const StudentProfile = () => {
  const storedUsername = localStorage.getItem("studentUsername") || "";
  const storedEmail = localStorage.getItem("studentEmail") || "";
  const storedPass = localStorage.getItem("studentPassword") || "";
  const storedRoleType = localStorage.getItem("studentRoleType") || "";

  const storedPic = localStorage.getItem("studentProfilePic") || "";

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(storedUsername);
  const [email, setEmail] = useState(storedEmail);
  const [password, setPassword] = useState(storedPass);
  const [role, setRole] = useState(storedRoleType);
  const [profilePic, setProfilePic] = useState(storedPic);
  const [showPass, setShowPass] = useState(false);

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

  const saveProfile = () => {
    localStorage.setItem("studentUsername", username);
    localStorage.setItem("studentEmail", email);
    localStorage.setItem("studentPassword", password);
    localStorage.setItem("studentRoleType", role);
    localStorage.setItem("studentProfilePic", profilePic);

    alert("✅ Profile Updated Successfully!");
    setIsEditing(false);
  };

  return (
    <div className="profile-section">

      {/* SHOW PROFILE */}
      {!isEditing && (
        <>
          <div className="profile-pic-container">
            {profilePic ? (
              <img src={profilePic} className="profile-pic" alt="profile" />
            ) : (
              <div className="default-avatar">
                {username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h2>My Profile</h2>

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
              <span className="label">User Type:</span>
              <span className="value">{role}</span>
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

      {/* EDIT PROFILE FORM */}
      {isEditing && (
        <>
          <h2>Edit Profile</h2>
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

           {/* PASSWORD WITH EYE ICON */}
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


            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="FY">FY</option>
              <option value="SY">SY</option>
              <option value="TY">TY</option>
            </select>

            <button onClick={saveProfile}>Save Changes</button>
          </div>
        </>
      )}

    </div>
  );
};

export default StudentProfile;