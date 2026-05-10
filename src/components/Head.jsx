import React from "react";
import SearchBar from "./SearchBar";

export default function Head() {
  return (
    <nav className="navbar" style={{ position: "relative" }}>
      <div className="logo">
        <span className="logo-icon">▽</span>
        <span className="logo-text">AUDTLIST</span>
      </div>
      <div className="search-container">
        <SearchBar />
      </div>

      <div className="auth-buttons">
        <button className="btn-signin">Sign in</button>
        <button className="btn-register">Register</button>
      </div>
    </nav>
  );
}
