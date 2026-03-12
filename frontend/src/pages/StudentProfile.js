import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../api/axios";
import "../styles/studentProfile.css";

const StudentProfile = () => {

  const username = localStorage.getItem("studentUsername");

  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    try {

      const res = await api.get(`/api/students/${username}`);

      setProfile(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setProfile({

      ...profile,

      [e.target.name]: e.target.value

    });

  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setProfile({

        ...profile,

        profilePic: reader.result

      });

    };

    reader.readAsDataURL(file);

  };

  const saveProfile = async () => {

    try {

      await api.put(`/api/students/${username}`, profile);

      alert("✅ Profile Updated Successfully");

      setIsEditing(false);

      loadProfile();

    } catch (error) {

      console.log(error);

      alert("Update failed");

    }

  };

  if (!profile) return <h2>Loading...</h2>;

  return (

    <div className="profile-section">

      {!isEditing && (

        <>

          <div className="profile-pic-container">

            {profile.profilePic ? (

              <img src={profile.profilePic} className="profile-pic" alt="profile" />

            ) : (

              <div className="default-avatar">

                {profile.username?.charAt(0).toUpperCase()}

              </div>

            )}

          </div>

          <h2>My Profile</h2>

          <div className="profile-card">

            <div className="profile-row">

              <span className="label">Username:</span>

              <span className="value">{profile.username}</span>

            </div>

            <div className="profile-row">

              <span className="label">Email:</span>

              <span className="value">{profile.email}</span>

            </div>

            <div className="profile-row password-row">

              <span className="label">Password:</span>

              <span className="value">

                {showPass ? profile.password : "••••••••"}

                <span

                  className="profile-eye"

                  onClick={() => setShowPass(!showPass)}

                >

                  {showPass ? <FaEyeSlash /> : <FaEye />}

                </span>

              </span>

            </div>

            <div className="profile-row">

              <span className="label">User Type:</span>

              <span className="value">{profile.roleType}</span>

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

            name="username"

            value={profile.username}

            onChange={handleChange}

          />

          <input

            name="email"

            value={profile.email}

            onChange={handleChange}

          />

          <input

            name="password"

            value={profile.password}

            onChange={handleChange}

          />

          <select

            name="roleType"

            value={profile.roleType}

            onChange={handleChange}

          >

            <option value="FY">FY</option>

            <option value="SY">SY</option>

            <option value="TY">TY</option>

          </select>

          <button onClick={saveProfile}>

            Save Changes

          </button>

        </div>

      )}

    </div>

  );

};

export default StudentProfile;