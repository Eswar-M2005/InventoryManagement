import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import SearchBar from '../components/SearchBar';
import ProductTable from '../components/ProductTable';
import Pagination from '../components/Pagination';
import ConfirmationModal from '../components/ConfirmationModal';
import Loader from '../components/Loader';
import '../styles/Products.css';

const ProductList = () => {
  const {
    products,
    categories,
    loading,
    currentPage,
    totalPages,
    totalProducts,
    getProducts,
    deleteProduct,
  } = useProducts();

  // Search, Filter, Sort local state
  const [searchVal, setSearchVal] = useState('');
  const [debouncedSearchVal, setDebouncedSearchVal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);

  // Delete Modal local state
  const [modalOpen, setModalOpen] = useState(false);
  const [prodToDeleteId, setProdToDeleteId] = useState(null);
  const [prodToDeleteName, setProdToDeleteName] = useState('');

  // Debounce search input
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDebouncedSearchVal(searchVal);
      setPage(1); // Reset page on search typing
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [searchVal]);

  // Fetch products on query state changes
  useEffect(() => {
    getProducts({
      page,
      limit: 10,
      search: debouncedSearchVal,
      category: selectedCategory,
      sortBy,
      sortOrder,
    });
  }, [page, debouncedSearchVal, selectedCategory, sortBy, sortOrder, getProducts]);

  // Event handlers
  const handleSearch = (val) => {
    setSearchVal(val);
  };

  const handleCategoryChange = (val) => {
    setSelectedCategory(val);
    setPage(1);
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    setPage(1);
  };

  const handleSortOrderToggle = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    setPage(1);
  };

  const handlePageChange = (pageNum) => {
    setPage(pageNum);
  };

  // Delete flow
  const handleDeleteClick = (id, name) => {
    setProdToDeleteId(id);
    setProdToDeleteName(name);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (prodToDeleteId) {
      const success = await deleteProduct(prodToDeleteId);
      if (success) {
        // Refresh products list for the current view settings
        getProducts({
          page,
          limit: 10,
          search: debouncedSearchVal,
          category: selectedCategory,
          sortBy,
          sortOrder,
        });
      }
    }
    setModalOpen(false);
    setProdToDeleteId(null);
    setProdToDeleteName('');
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
    setProdToDeleteId(null);
    setProdToDeleteName('');
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Product Catalog</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Search, filter, manage, and edit inventory stock.
          </p>
        </div>
        <Link to="/products/add" className="btn btn-primary" id="list-add-product-btn">
          ➕ Add New Product
        </Link>
      </div>

      {/* Control Box: Search, Filters, Sorting */}
      <SearchBar
        searchVal={searchVal}
        onSearchChange={handleSearch}
        selectedCategory={selectedCategory}
        categories={categories}
        onCategoryChange={handleCategoryChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        sortOrder={sortOrder}
        onSortOrderToggle={handleSortOrderToggle}
      />

      {/* Loading state or main table display */}
      {loading ? (
        <Loader text="Fetching catalog inventory..." />
      ) : (
        <>
          <ProductTable 
            products={products} 
            onDeleteClick={handleDeleteClick} 
          />
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalProducts={totalProducts}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* confirmation dialog */}
      <ConfirmationModal
        isOpen={modalOpen}
        title="Delete Product confirmation"
        message={`Are you sure you want to delete "${prodToDeleteName}"? This action is permanent and cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default ProductList;
