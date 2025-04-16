import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ColorModeProvider } from "../../contexts/ColorModeContext";

describe("Navbar", () => {
  const renderNavbar = (initialRoute = "/") => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <ColorModeProvider>
          <Navbar />
        </ColorModeProvider>
      </MemoryRouter>
    );
  };

  it("renders the brand name", () => {
    renderNavbar();
    expect(screen.getByText("Online Store")).toBeInTheDocument();
  });

  it("renders all navigation links", () => {
    renderNavbar();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("highlights the active navigation link", () => {
    renderNavbar("/products");
    const productsLink = screen.getByText("Products");
    expect(productsLink).toHaveClass("active");
  });

  it("renders the color mode switch", () => {
    renderNavbar();
    const colorModeSwitch = screen.getByRole("button", {
      name: /Switch to dark mode/i,
    });
    expect(colorModeSwitch).toBeInTheDocument();
  });

  it("toggles color mode when switch is clicked", () => {
    renderNavbar();
    const colorModeSwitch = screen.getByRole("button", {
      name: /Switch to dark mode/i,
    });

    // Initial state (light mode)
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe(
      "light"
    );

    // Click to switch to dark mode
    fireEvent.click(colorModeSwitch);
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe("dark");

    // Click again to switch back to light mode
    fireEvent.click(colorModeSwitch);
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe(
      "light"
    );
  });

  it("persists color mode preference in localStorage", () => {
    renderNavbar();
    const colorModeSwitch = screen.getByRole("button", {
      name: /Switch to dark mode/i,
    });

    // Switch to dark mode
    fireEvent.click(colorModeSwitch);
    expect(localStorage.getItem("colorMode")).toBe("dark");

    // Switch back to light mode
    fireEvent.click(colorModeSwitch);
    expect(localStorage.getItem("colorMode")).toBe("light");
  });

  it("renders with correct background class based on color mode", () => {
    renderNavbar();
    const navbar = screen.getByRole("navigation");

    // Initial state (light mode)
    expect(navbar).toHaveClass("bg-white");

    // Switch to dark mode
    const colorModeSwitch = screen.getByRole("button", {
      name: /Switch to dark mode/i,
    });
    fireEvent.click(colorModeSwitch);
    expect(navbar).toHaveClass("bg-dark");
  });
});
