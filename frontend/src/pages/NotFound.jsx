import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div 
      className="empty-state" 
      style={{ 
        maxWidth: '500px', 
        margin: '4rem auto 0 auto', 
        boxShadow: 'var(--shadow-md)',
        padding: '3.5rem 2rem'
      }}
    >
      <div className="empty-state-icon" style={{ fontSize: '4.5rem' }}>🧭</div>
      <h2 className="empty-state-title" style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>404 - Page Not Found</h2>
      <p className="empty-state-desc" style={{ marginBottom: '2rem' }}>
        The link you followed may be broken, or the page may have been moved or deleted.
      </p>
      <Link to="/" className="btn btn-primary" id="not-found-back-home-btn">
        🏠 Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
