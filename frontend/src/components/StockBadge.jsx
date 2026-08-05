import React from 'react';

const StockBadge = ({ quantity }) => {
  let badgeClass = '';
  let statusText = '';

  if (quantity === 0) {
    badgeClass = 'badge-gray';
    statusText = 'Out of Stock';
  } else if (quantity < 10) {
    badgeClass = 'badge-red';
    statusText = 'Low Stock';
  } else if (quantity <= 20) {
    badgeClass = 'badge-yellow';
    statusText = 'Moderate';
  } else {
    badgeClass = 'badge-green';
    statusText = 'In Stock';
  }

  return (
    <span className={`badge ${badgeClass}`}>
      <span className="badge-dot"></span>
      {statusText} ({quantity})
    </span>
  );
};

export default StockBadge;
