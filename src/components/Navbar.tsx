import { Link, useLocation } from "react-router-dom";
import { ColorModeSwitch } from "./ColorModeSwitch";
import { useColorMode } from "../contexts/ColorModeContext";

export default function Navbar() {
  const location = useLocation();
  const { colorMode } = useColorMode();

  return (
    <nav
      className={`navbar navbar-expand-md shadow-sm sticky-top ${
        colorMode === "light" ? "bg-white" : "bg-dark"
      }`}
    >
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

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav">
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
            <li className="nav-item">
              <Link
                to="/admin"
                className={`nav-link ${
                  location.pathname === "/admin" ? "active" : ""
                }`}
              >
                Admin
              </Link>
            </li>
          </ul>
          <ColorModeSwitch />
        </div>
      </div>
    </nav>
  );
}
