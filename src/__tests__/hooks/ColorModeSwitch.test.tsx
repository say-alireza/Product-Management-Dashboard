import { render, screen, fireEvent } from "@testing-library/react";
import { ColorModeSwitch } from "../../components/ColorModeSwitch";
import { ColorModeProvider } from "../../contexts/ColorModeContext";

describe("ColorModeSwitch", () => {
  const renderColorModeSwitch = () => {
    return render(
      <ColorModeProvider>
        <ColorModeSwitch />
      </ColorModeProvider>
    );
  };

  beforeEach(() => {
    // Reset document attribute before each test
    document.documentElement.removeAttribute("data-bs-theme");
  });

  it("renders the switch button", () => {
    renderColorModeSwitch();
    const switchButton = screen.getByRole("button", {
      name: /Switch to dark mode/i,
    });
    expect(switchButton).toBeInTheDocument();
  });

  it("displays the correct icon based on current mode", () => {
    renderColorModeSwitch();

    // Initial state (light mode)
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Switch to dark mode"
    );
    expect(screen.getByRole("button")).toHaveAttribute(
      "title",
      "Switch to dark mode"
    );
    expect(screen.getByRole("img", { hidden: true })).toHaveClass(
      "bi-moon-fill"
    );

    // Switch to dark mode
    fireEvent.click(screen.getByRole("button"));

    // Dark mode state
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Switch to light mode"
    );
    expect(screen.getByRole("button")).toHaveAttribute(
      "title",
      "Switch to light mode"
    );
    expect(screen.getByRole("img", { hidden: true })).toHaveClass(
      "bi-sun-fill"
    );
  });

  it("toggles color mode when clicked", () => {
    renderColorModeSwitch();
    const switchButton = screen.getByRole("button");

    // Initial state (light mode)
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe(
      "light"
    );

    // Click to switch to dark mode
    fireEvent.click(switchButton);
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe("dark");

    // Click again to switch back to light mode
    fireEvent.click(switchButton);
    expect(document.documentElement.getAttribute("data-bs-theme")).toBe(
      "light"
    );
  });

  it("has proper accessibility attributes", () => {
    renderColorModeSwitch();
    const switchButton = screen.getByRole("button");

    // Initial state
    expect(switchButton).toHaveAttribute("aria-label", "Switch to dark mode");
    expect(switchButton).toHaveAttribute("title", "Switch to dark mode");

    // Switch to dark mode
    fireEvent.click(switchButton);

    // Updated state
    expect(switchButton).toHaveAttribute("aria-label", "Switch to light mode");
    expect(switchButton).toHaveAttribute("title", "Switch to light mode");
  });

  it("has proper styling classes", () => {
    renderColorModeSwitch();
    const switchButton = screen.getByRole("button");

    expect(switchButton).toHaveClass("btn", "btn-link", "nav-link", "px-3");
  });
});
