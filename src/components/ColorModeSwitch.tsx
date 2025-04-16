import React from "react";
import { useColorMode } from "../contexts/ColorModeContext";

/**
 * Component that renders a button to toggle between light and dark modes
 * @returns JSX.Element
 */
export function ColorModeSwitch(): JSX.Element {
  const { colorMode, toggleColorMode } = useColorMode();

  const isLightMode = colorMode === "light";
  const nextMode = isLightMode ? "dark" : "light";
  const iconClass = isLightMode ? "bi-moon-fill" : "bi-sun-fill";

  return (
    <button
      className="btn btn-link nav-link px-3"
      onClick={toggleColorMode}
      aria-label={`Switch to ${nextMode} mode`}
      title={`Switch to ${nextMode} mode`}
    >
      <i className={`bi ${iconClass}`} aria-hidden="true" />
    </button>
  );
}
