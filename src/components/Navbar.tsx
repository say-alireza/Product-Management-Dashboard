import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-md bg-white shadow-sm sticky-top"
      dir="rtl"
    >
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold text-primary">
          فروشگاه آنلاین
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
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                <i className="bi bi-house-door ms-1"></i>
                صفحه اصلی
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/products"
                className={`nav-link ${
                  location.pathname === "/products" ? "active" : ""
                }`}
              >
                <i className="bi bi-grid ms-1"></i>
                محصولات
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/categories"
                className={`nav-link ${
                  location.pathname === "/categories" ? "active" : ""
                }`}
              >
                <i className="bi bi-collection ms-1"></i>
                دسته‌بندی‌ها
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
              >
                <i className="bi bi-info-circle ms-1"></i>
                درباره ما
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin"
                className={`nav-link ${
                  location.pathname === "/admin" ? "active" : ""
                } text-danger`}
              >
                <i className="bi bi-shield-lock ms-1"></i>
                پنل مدیریت
              </Link>
            </li>
          </ul>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary">
              <i className="bi bi-box-arrow-in-left ms-1"></i>
              ورود
            </button>
            <button className="btn btn-primary">
              <i className="bi bi-person-plus ms-1"></i>
              ثبت نام
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
