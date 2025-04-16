import React from "react";
import { useColorMode } from "../contexts/ColorModeContext";

export function ColorModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <button
      className="btn btn-link nav-link px-3"
      onClick={toggleColorMode}
      aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
    >
      {colorMode === "light" ? (
        <i className="bi bi-moon-fill" />
      ) : (
        <i className="bi bi-sun-fill" />
      )}
    </button>
  );
}
