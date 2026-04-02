import { useState, useEffect } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Sorting state
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const API_BASE_URL = 'https://chasekf7-bookstore-api.azurewebsites.net/api';

  useEffect(() => {
    fetchBooks();
  }, [pageNumber, pageSize, sortBy, sortOrder]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = `${API_BASE_URL}/books?pageNumber=${pageNumber}&pageSize=${pageSize}`;

      if (sortBy) {
        url += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setBooks(data.items);
      setTotalCount(data.totalCount);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setPageNumber(1); // Reset to first page when changing page size
  };

  const handleSortToggle = () => {
    if (sortBy === 'title') {
      // If already sorting by title, toggle the order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Start sorting by title in ascending order
      setSortBy('title');
      setSortOrder('asc');
    }
  };

  const handleClearSort = () => {
    setSortBy('');
    setSortOrder('asc');
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>Failed to load books: {error}</p>
          <hr />
          <p className="mb-0">Please make sure the API is running on {API_BASE_URL}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row mb-4">
        <div className="col">
          <h1 className="display-4 text-primary">Bookstore Collection</h1>
          <p className="lead">Browse our selection of {totalCount} amazing books</p>
        </div>
      </div>

      {/* Controls Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Display Options</h5>
              <div className="mb-3">
                <label htmlFor="pageSizeSelect" className="form-label">
                  Books per page:
                </label>
                <select
                  id="pageSizeSelect"
                  className="form-select"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sorting</h5>
              <div className="btn-group" role="group">
                <button
                  className={`btn ${sortBy === 'title' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={handleSortToggle}
                >
                  Sort by Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                {sortBy && (
                  <button
                    className="btn btn-outline-secondary"
                    onClick={handleClearSort}
                  >
                    Clear Sort
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Books Table */}
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Books List</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Publisher</th>
                  <th scope="col">ISBN</th>
                  <th scope="col">Category</th>
                  <th scope="col">Pages</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.bookId}>
                    <th scope="row">{book.bookId}</th>
                    <td className="fw-bold">{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                    <td className="font-monospace small">{book.isbn}</td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {book.classification}
                      </span>
                    </td>
                    <td>{book.pageCount}</td>
                    <td className="text-success fw-bold">
                      ${book.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="row mt-4">
        <div className="col-12">
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setPageNumber(1)}
                  disabled={pageNumber === 1}
                >
                  First
                </button>
              </li>
              <li className={`page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setPageNumber(pageNumber - 1)}
                  disabled={pageNumber === 1}
                >
                  Previous
                </button>
              </li>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                // Show current page, first page, last page, and pages near current
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= pageNumber - 1 && page <= pageNumber + 1)
                ) {
                  return (
                    <li
                      key={page}
                      className={`page-item ${pageNumber === page ? 'active' : ''}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setPageNumber(page)}
                      >
                        {page}
                      </button>
                    </li>
                  );
                } else if (
                  page === pageNumber - 2 ||
                  page === pageNumber + 2
                ) {
                  return (
                    <li key={page} className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  );
                }
                return null;
              })}

              <li className={`page-item ${pageNumber === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setPageNumber(pageNumber + 1)}
                  disabled={pageNumber === totalPages}
                >
                  Next
                </button>
              </li>
              <li className={`page-item ${pageNumber === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setPageNumber(totalPages)}
                  disabled={pageNumber === totalPages}
                >
                  Last
                </button>
              </li>
            </ul>
          </nav>
          <p className="text-center text-muted">
            Showing page {pageNumber} of {totalPages} ({totalCount} total books)
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookList;
