import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    navigate("/");
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--background-color)" }}>
      <form onSubmit={handleSubmit} style={{
        background: "#fff",
        padding: "40px 32px",
        borderRadius: 16,
        boxShadow: "0 6px 24px rgba(20,58,82,0.10)",
        minWidth: 320,
        maxWidth: 360,
        width: "100%"
      }}>
        <h2 style={{ color: "var(--primary-color)", fontWeight: 700, marginBottom: 24, textAlign: "center" }}>Login</h2>
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="email" style={{ color: "var(--text-light)", fontWeight: 500 }}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px 10px",
              borderRadius: 8,
              border: "1px solid #e3e9f1",
              marginTop: 6,
              marginBottom: 2,
              fontSize: 16
            }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label htmlFor="password" style={{ color: "var(--text-light)", fontWeight: 500 }}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px 10px",
              borderRadius: 8,
              border: "1px solid #e3e9f1",
              marginTop: 6,
              marginBottom: 2,
              fontSize: 16
            }}
          />
        </div>
        <button type="submit" style={{
          width: "100%",
          padding: "14px 0",
          borderRadius: 8,
          background: "var(--accent-color)",
          color: "#fff",
          fontWeight: 700,
          fontSize: 18,
          border: "none",
          cursor: "pointer",
          marginBottom: 10,
          transition: "var(--transition)"
        }}>Login</button>
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <span style={{ color: "var(--text-light)", fontSize: 15 }}>Don't have an account? </span>
          <Link to="/signup" style={{ color: "var(--accent-color)", textDecoration: "none", fontWeight: 600 }}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login; 