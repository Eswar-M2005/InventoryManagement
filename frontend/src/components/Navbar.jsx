import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <nav className="navbar" id="app-navbar">
      <div className="navbar-brand">
        📦 Stock<span>Vibe</span>
      </div>
      <div className="navbar-right">
        <div className="navbar-status">
          <span className="status-dot"></span>
          <span>System Active</span>
        </div>
        <div className="navbar-date" style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          {currentDate}
        </div>
        <div className="navbar-user">
          <div className="user-avatar">G1</div>
          <div className="user-info">
            <span className="user-name">Guest1</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
