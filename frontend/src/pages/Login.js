import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✔ form validation
    if (!username.trim() || !email.trim() || !password.trim() || !role) {
      alert("Please fill all fields!");
      return;
    }

    // ================= STUDENT LOGIN =================
    if (role === "FY" || role === "SY" || role === "TY") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "student");

      localStorage.setItem("studentRoleType", role);
      localStorage.setItem("studentUsername", username);
      localStorage.setItem("studentEmail", email);
      localStorage.setItem("studentPassword", password);

      alert(`✅ ${role} Login Successful`);
      window.location.href = "/"; 
      return;
    }

    // ================= ADMIN LOGIN =================
    if (role === "Admin") {
      // You can allow any admin credentials OR validate later
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");
      localStorage.setItem("adminUsername", username);
      localStorage.setItem("adminEmail", email);
      localStorage.setItem("adminPassword", password);

      alert("✅ Admin Login Successful");
      window.location.href = "/"; 
      return;
    }

    alert("⚠ Invalid role selected");
  };

  return (
    <div className="login-page">
      <div className="login-box">

        {/* LEFT SIDE */}
        <div className="login-left">
          <h1>Welcome Back</h1>
          <p>Login to access college events</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <h3>Login</h3>

          <form onSubmit={handleSubmit}>

            {/* USERNAME */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            
            {/* PASSWORD WITH EYE */}
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* EMAIL */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />


            {/* ROLE DROPDOWN */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="FY">FY</option>
              <option value="SY">SY</option>
              <option value="TY">TY</option>
              <option value="Admin">Admin</option>
            </select>

            {/* LOGIN BUTTON */}
            <button type="submit">Login</button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;