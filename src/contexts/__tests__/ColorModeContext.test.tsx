import { render, screen, fireEvent, act } from "@testing-library/react";
import { ColorModeProvider, useColorMode } from "../ColorModeContext";

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

// Test component that uses the context
const TestComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <span data-testid="color-mode">{colorMode}</span>
      <button onClick={toggleColorMode}>Toggle</button>
    </div>
  );
};

describe("ColorModeContext", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Reset document attribute
    document.documentElement.removeAttribute("data-bs-theme");
  });

  it("provides default light mode when no preference is stored", () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    render(
      <ColorModeProvider>
        <TestComponent />
      </ColorModeProvider>
    );

    expect(screen.getByTestId("color-mode")).toHaveTextContent("light");
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe(
      "light"
    );
  });

  it("uses stored preference from localStorage", () => {
    mockLocalStorage.getItem.mockReturnValue("dark");

    render(
      <ColorModeProvider>
        <TestComponent />
      </ColorModeProvider>
    );

    expect(screen.getByTestId("color-mode")).toHaveTextContent("dark");
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe("dark");
  });

  it("toggles between light and dark mode", () => {
    mockLocalStorage.getItem.mockReturnValue("light");

    render(
      <ColorModeProvider>
        <TestComponent />
      </ColorModeProvider>
    );

    // Initial state
    expect(screen.getByTestId("color-mode")).toHaveTextContent("light");

    // Toggle to dark mode
    fireEvent.click(screen.getByText("Toggle"));
    expect(screen.getByTestId("color-mode")).toHaveTextContent("dark");
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe("dark");
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith("colorMode", "dark");

    // Toggle back to light mode
    fireEvent.click(screen.getByText("Toggle"));
    expect(screen.getByTestId("color-mode")).toHaveTextContent("light");
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe(
      "light"
    );
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith("colorMode", "light");
  });

  it("throws error when used outside provider", () => {
    // Suppress console error for this test
    const consoleError = console.error;
    console.error = jest.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useColorMode must be used within a ColorModeProvider");

    // Restore console error
    console.error = consoleError;
  });

  it("updates document theme attribute when color mode changes", () => {
    mockLocalStorage.getItem.mockReturnValue("light");

    render(
      <ColorModeProvider>
        <TestComponent />
      </ColorModeProvider>
    );

    // Initial state
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe(
      "light"
    );

    // Change to dark mode
    act(() => {
      fireEvent.click(screen.getByText("Toggle"));
    });

    expect(document.documentElement.getAttribute("data-bs-theme")).toBe("dark");
  });
});
