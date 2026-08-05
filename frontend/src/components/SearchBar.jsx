import React from 'react';
import '../styles/Products.css';

const SearchBar = ({
  searchVal,
  onSearchChange,
  selectedCategory,
  categories = [],
  onCategoryChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderToggle,
}) => {
  return (
    <div className="controls-container">
      {/* Search Input Box */}
      <div className="search-box">
        <span style={{ fontSize: '1rem' }}>🔍</span>
        <input
          type="text"
          placeholder="Search by Name, SKU or Category..."
          value={searchVal}
          onChange={(e) => onSearchChange(e.target.value)}
          id="search-products-input"
        />
        {searchVal && (
          <button 
            type="button" 
            onClick={() => onSearchChange('')} 
            style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}
          >
            ❌
          </button>
        )}
      </div>

      {/* Filters and Sorters */}
      <div className="filter-group">
        {/* Category Filter */}
        <select
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          id="category-filter-select"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Sort By Field */}
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          id="sort-by-select"
        >
          <option value="createdAt">Date Created</option>
          <option value="name">Product Name</option>
          <option value="price">Price</option>
          <option value="quantity">Quantity</option>
        </select>

        {/* Sort Order Toggle Button */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onSortOrderToggle}
          title={sortOrder === 'asc' ? 'Sort Ascending' : 'Sort Descending'}
          style={{ padding: '0.625rem 0.875rem', height: '40px' }}
        >
          {sortOrder === 'asc' ? '⬆️ Asc' : '⬇️ Desc'}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
