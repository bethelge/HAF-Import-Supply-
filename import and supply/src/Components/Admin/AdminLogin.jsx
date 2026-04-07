import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./admin.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin"); // Redirect to admin dashboard
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear old error messages
    try {
      const res = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        username,
        password,
      });

      if (res.data?.token) {
        localStorage.setItem("adminToken", res.data.token);
        navigate("/admin"); // Go to admin dashboard
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-login-form">
      <h1
        style={{
          textAlign: "center",
          fontSize: "1.8rem",
          fontWeight: "bold",
          background: "linear-gradient(to right, #0077b6, #38b000)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: "0.5rem",
          paddingRight: "80px",
        }}
      >
        HAF Import and Supply
      </h1>

      <h2>Admin Login</h2>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}
