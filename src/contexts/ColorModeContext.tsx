import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Available color modes for the application
 */
export type ColorMode = "light" | "dark";

/**
 * Context interface for color mode functionality
 */
interface ColorModeContextType {
  /** Current color mode */
  colorMode: ColorMode;
  /** Function to toggle between light and dark modes */
  toggleColorMode: () => void;
}

// Create context with undefined default value
const ColorModeContext = createContext<ColorModeContextType | undefined>(
  undefined
);

/**
 * Provider component for color mode functionality
 * @param children - React children components
 */
export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage or default to light mode
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    const savedMode = localStorage.getItem("colorMode");
    return (savedMode as ColorMode) || "light";
  });

  // Update localStorage and document theme when colorMode changes
  useEffect(() => {
    localStorage.setItem("colorMode", colorMode);
    document.documentElement.setAttribute("data-bs-theme", colorMode);
  }, [colorMode]);

  /**
   * Toggle between light and dark modes
   */
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const value = {
    colorMode,
    toggleColorMode,
  };

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
}

/**
 * Custom hook to access color mode functionality
 * @throws Error if used outside of ColorModeProvider
 * @returns ColorModeContextType
 */
export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
}
