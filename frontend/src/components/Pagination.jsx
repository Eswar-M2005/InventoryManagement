import React from 'react';
import '../styles/Products.css';

const Pagination = ({
  currentPage,
  totalPages,
  totalProducts,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return (
      <div className="pagination-container" style={{ justifyContent: 'center' }}>
        <span className="pagination-info">Showing all {totalProducts} products</span>
      </div>
    );
  }

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <span className="pagination-info">
        Page <strong>{currentPage}</strong> of {totalPages} ({totalProducts} items total)
      </span>

      <div className="pagination-controls">
        <button
          type="button"
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo; Prev
        </button>

        {pageNumbers.map((num) => (
          <button
            key={num}
            type="button"
            className={`pagination-btn ${currentPage === num ? 'active' : ''}`}
            onClick={() => onPageChange(num)}
          >
            {num}
          </button>
        ))}

        <button
          type="button"
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
