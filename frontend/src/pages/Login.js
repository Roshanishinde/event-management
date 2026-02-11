import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 GET SAVED ADMIN CREDENTIALS (DYNAMIC)
    const savedAdminUsername =
      localStorage.getItem("adminUsername") || "admin";

    const savedAdminPassword =
      localStorage.getItem("adminPassword") || "admin123";

    // ================= ADMIN LOGIN =================
    if (username === savedAdminUsername && password === savedAdminPassword) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");

      alert("✅ Admin Login Successful");
      window.location.href = "/admin-dashboard";
      return;
    }

    // ================= STUDENT LOGIN =================
    // (optional: you can add student validation later)
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", "student");

    alert("✅ Student Login Successful");
    window.location.href = "/student-dashboard";
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
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            {/* PASSWORD WITH EYE ICON */}
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;