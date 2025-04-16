import { Link, useLocation } from "react-router-dom";
import { ColorModeSwitch } from "./ColorModeSwitch";
import { useColorMode } from "../contexts/ColorModeContext";

/**
 * Navigation items configuration
 */
const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/products", label: "Products" },
  { path: "/admin", label: "Admin" },
] as const;

/**
 * Navbar component that provides navigation and theme switching
 * @returns JSX.Element
 */
export default function Navbar(): JSX.Element {
  const location = useLocation();
  const { colorMode } = useColorMode();

  /**
   * Get the appropriate background class based on color mode
   */
  const getNavbarBgClass = () =>
    colorMode === "light" ? "bg-white" : "bg-dark";

  return (
    <nav
      className={`navbar navbar-expand-md shadow-sm sticky-top ${getNavbarBgClass()}`}
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
            {NAV_ITEMS.map(({ path, label }) => (
              <li className="nav-item" key={path}>
                <Link
                  to={path}
                  className={`nav-link ${
                    location.pathname === path ? "active" : ""
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <ColorModeSwitch />
        </div>
      </div>
    </nav>
  );
}
