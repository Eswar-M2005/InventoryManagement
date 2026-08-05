import React from 'react';

const Loader = ({ text = 'Loading...', fullPage = false, size = 'md' }) => {
  return (
    <div className={`loader-wrapper ${fullPage ? 'full-page' : ''}`}>
      <div className={`spinner ${size === 'sm' ? 'spinner-sm' : ''}`}></div>
      {text && <span className="loader-text">{text}</span>}
    </div>
  );
};

export default Loader;
