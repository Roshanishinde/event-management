import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Ensure admin credentials exist in localStorage on first load
  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("adminCredentials"));
    if (!storedAdmin) {
      localStorage.setItem(
        "adminCredentials",
        JSON.stringify({
          username: "khushi",
          password: "khushi123",
          email: "khushi@gmail.com"
        })
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

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
      localStorage.setItem("studentPassword", password);
      localStorage.setItem("studentEmail", email);

      alert(`✅ ${role} Login Successful`);
      window.location.href = "/";
      return;
    }

    // ================= ADMIN LOGIN =================
    if (role === "Admin") {
      const storedAdmin = JSON.parse(localStorage.getItem("adminCredentials"));

      if (
        storedAdmin &&
        username === storedAdmin.username &&
        password === storedAdmin.password &&
        email === storedAdmin.email
      ) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", "admin");
        // Save details for admin panel display
        localStorage.setItem("adminUsername", storedAdmin.username);
        localStorage.setItem("adminPassword", storedAdmin.password);
        localStorage.setItem("adminEmail", storedAdmin.email);

        alert("✅ Admin Login Successful");
        window.location.href = "/"; // redirect to admin dashboard
      } else {
        alert("⚠ Invalid admin credentials");
      }
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

            {/* PASSWORD */}
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
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

            {/* ROLE */}
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

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
 