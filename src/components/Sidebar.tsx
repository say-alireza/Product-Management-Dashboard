import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="sidebar-toggle btn btn-primary position-fixed start-0 top-0 m-2 z-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="bi bi-list fs-4"></i>
      </button>

      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "show" : ""}`}>
        <div className="d-flex flex-column h-100">
          {/* Logo */}
          <div className="p-3 border-bottom">
            <Link
              to="/"
              className="text-decoration-none"
              onClick={() => setIsOpen(false)}
            >
              <h4 className="mb-0 text-primary fw-bold">فروشگاه آنلاین</h4>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-grow-1 p-3">
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link
                  to="/"
                  className={`nav-link ${isActiveRoute("/") ? "active" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  <i className="bi bi-house-door"></i>
                  <span>صفحه اصلی</span>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/products"
                  className={`nav-link ${
                    isActiveRoute("/products") ? "active" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <i className="bi bi-grid"></i>
                  <span>محصولات</span>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/categories"
                  className={`nav-link ${
                    isActiveRoute("/categories") ? "active" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <i className="bi bi-collection"></i>
                  <span>دسته‌بندی‌ها</span>
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link
                  to="/about"
                  className={`nav-link ${
                    isActiveRoute("/about") ? "active" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <i className="bi bi-info-circle"></i>
                  <span>درباره ما</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* User Actions */}
          <div className="p-3 border-top mt-auto">
            <div className="d-grid gap-2">
              <button className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2">
                <i className="bi bi-box-arrow-in-left"></i>
                <span>ورود</span>
              </button>
              <button className="btn btn-primary d-flex align-items-center justify-content-center gap-2">
                <i className="bi bi-person-plus"></i>
                <span>ثبت نام</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
