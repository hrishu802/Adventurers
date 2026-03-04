import React from "react";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaArrowUp } from "react-icons/fa";

const Footer = () => (
  <footer style={{
    background: "linear-gradient(90deg, #143a52 60%, #ff6f61 100%)",
    color: "#fff",
    padding: "32px 0 16px 0",
    textAlign: "center",
    marginTop: "auto",
    boxShadow: "0 -2px 16px rgba(20,58,82,0.08)",
    position: 'relative',
  }}>
    <div style={{ fontSize: "1.3rem", fontWeight: 700, letterSpacing: 1, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
      <span style={{ fontSize: 24, display: 'flex', alignItems: 'center' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 16.5L23 7.5M2 16.5L9 18.5L12 21.5L13.5 19.5L11.5 16.5M2 16.5L11.5 16.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
      JetSetGo
    </div>
    <div style={{ marginBottom: 12, color: "#ffb6b6", display: 'flex', justifyContent: 'center', gap: 16, fontSize: 22 }}>
      <a href="mailto:info@jetsetgo.com" style={{ color: "#ffb6b6", margin: "0 10px", textDecoration: "none", fontSize: 18 }}>Contact</a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#ffb6b6" }}><FaInstagram /></a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "#ffb6b6" }}><FaTwitter /></a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#ffb6b6" }}><FaFacebook /></a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: "#ffb6b6" }}><FaLinkedin /></a>
    </div>
    <div style={{ fontSize: "0.95rem", color: "#b0c4d8" }}>
      &copy; {new Date().getFullYear()} JetSetGo. All rights reserved.
    </div>
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
      position: 'absolute',
      right: 24,
      bottom: 24,
      background: 'rgba(255,255,255,0.15)',
      border: 'none',
      borderRadius: '50%',
      width: 44,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#fff',
      fontSize: 22,
      boxShadow: '0 2px 8px rgba(20,58,82,0.10)',
      transition: 'background 0.2s',
    }} title="Back to Top">
      <FaArrowUp />
    </button>
  </footer>
);

export default Footer; 