import { useState, useEffect } from 'react';

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    pageCount: '',
    price: ''
  });

  const API_BASE_URL = 'http://localhost:5149/api';

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all books without pagination for admin view
      const response = await fetch(`${API_BASE_URL}/books?pageSize=100`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBooks(data.items);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingBook(null);
    setFormData({
      title: '',
      author: '',
      publisher: '',
      isbn: '',
      classification: '',
      pageCount: '',
      price: ''
    });
  };

  const handleEdit = (book) => {
    setIsCreating(false);
    setEditingBook(book.bookId);
    setFormData({
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      isbn: book.isbn,
      classification: book.classification,
      pageCount: book.pageCount.toString(),
      price: book.price.toString()
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingBook(null);
    setFormData({
      title: '',
      author: '',
      publisher: '',
      isbn: '',
      classification: '',
      pageCount: '',
      price: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookData = {
        ...formData,
        pageCount: parseInt(formData.pageCount),
        price: parseFloat(formData.price)
      };

      let response;
      if (isCreating) {
        // Create new book
        response = await fetch(`${API_BASE_URL}/books`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookData)
        });
      } else {
        // Update existing book
        bookData.bookId = editingBook;
        response = await fetch(`${API_BASE_URL}/books/${editingBook}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookData)
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Reset form and refresh books
      handleCancel();
      fetchAllBooks();

      alert(isCreating ? 'Book created successfully!' : 'Book updated successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (bookId) => {
    if (!confirm('Are you sure you want to delete this book?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/books/${bookId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      fetchAllBooks();
      alert('Book deleted successfully!');
    } catch (err) {
      alert(`Error deleting book: ${err.message}`);
    }
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
          <h1 className="display-4 text-danger">Admin - Manage Books</h1>
          <p className="lead">Add, edit, or delete books from the collection</p>
        </div>
        <div className="col-auto">
          <button
            className="btn btn-success btn-lg"
            onClick={handleCreate}
          >
            + Add New Book
          </button>
        </div>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingBook) && (
        <div className="card mb-4 border-primary">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">{isCreating ? 'Create New Book' : 'Edit Book'}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="author" className="form-label">Author *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="publisher" className="form-label">Publisher *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="publisher"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="isbn" className="form-label">ISBN *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="isbn"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="classification" className="form-label">Classification *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="classification"
                    name="classification"
                    value={formData.classification}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="pageCount" className="form-label">Page Count *</label>
                  <input
                    type="number"
                    className="form-control"
                    id="pageCount"
                    name="pageCount"
                    value={formData.pageCount}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="price" className="form-label">Price *</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0.01"
                    required
                  />
                </div>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {isCreating ? 'Create Book' : 'Update Book'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Books Table */}
      <div className="card shadow">
        <div className="card-header bg-danger text-white">
          <h5 className="mb-0">All Books ({books.length})</h5>
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
                  <th scope="col">Actions</th>
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
                    <td>
                      <div className="btn-group btn-group-sm" role="group">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => handleEdit(book)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => handleDelete(book.bookId)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBooks;
