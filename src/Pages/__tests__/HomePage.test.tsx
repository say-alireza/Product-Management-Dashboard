import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";
import { ColorModeProvider } from "../../contexts/ColorModeContext";

// Mock window.location
const mockLocation = { href: "" };
Object.defineProperty(window, "location", {
  value: mockLocation,
  writable: true,
});

describe("HomePage", () => {
  const renderHomePage = () => {
    return render(
      <BrowserRouter>
        <ColorModeProvider>
          <HomePage />
        </ColorModeProvider>
      </BrowserRouter>
    );
  };

  it("renders the welcome message", () => {
    renderHomePage();
    expect(screen.getByText("Welcome to Our Store")).toBeInTheDocument();
  });

  it("renders the description text", () => {
    renderHomePage();
    expect(
      screen.getByText(
        /Discover our complete collection of high-quality products/i
      )
    ).toBeInTheDocument();
  });

  it("renders the View Products button", () => {
    renderHomePage();
    expect(screen.getByText("View Products")).toBeInTheDocument();
  });

  it("navigates to products page when View Products button is clicked", () => {
    renderHomePage();
    const viewProductsButton = screen.getByText("View Products");
    fireEvent.click(viewProductsButton);
    expect(mockLocation.href).toBe("/products");
  });

  it("renders the hero image with correct attributes", () => {
    renderHomePage();
    const heroImage = screen.getByAltText("Online shopping experience");
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute(
      "src",
      "/images/Shop-Anytime-Anywhere (1).jpg"
    );
  });

  it("loads fallback image when hero image fails to load", () => {
    renderHomePage();
    const heroImage = screen.getByAltText("Online shopping experience");
    fireEvent.error(heroImage);
    expect(heroImage).toHaveAttribute("src", "/placeholder.svg");
  });
});
