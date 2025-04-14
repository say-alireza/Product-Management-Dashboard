import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-md bg-white shadow-sm sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold text-primary">
          Online Store
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/products"
                className={`nav-link ${
                  location.pathname === "/products" ? "active" : ""
                }`}
              >
                Products
              </Link>
            </li>
          </ul>

          <div className="d-flex gap-2">
            <Link to="/admin" className="btn btn-outline-danger">
              Admin Panel
            </Link>
            <button className="btn btn-outline-primary">
              <i className="bi bi-box-arrow-in-left me-1"></i>
              Login
            </button>
            <button className="btn btn-primary">
              <i className="bi bi-person-plus me-1"></i>
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
