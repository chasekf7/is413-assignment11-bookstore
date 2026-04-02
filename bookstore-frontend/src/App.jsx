import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import BookList from './components/BookList'
import AdminBooks from './components/AdminBooks'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Bookstore</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Browse Books</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/adminbooks">Admin</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/adminbooks" element={<AdminBooks />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
