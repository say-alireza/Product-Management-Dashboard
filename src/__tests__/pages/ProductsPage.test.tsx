import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductsPage from "../../Pages/ProductsPage";

// Mock the useProducts hook
jest.mock("../../hooks/useProducts", () => ({
  useProducts: () => ({
    products: [
      {
        id: "1",
        name: "Test Product 1",
        description: "Test Description 1",
        price: 100,
        stock: 10,
        images: ["test1.jpg"],
        category: "Category 1",
      },
      {
        id: "2",
        name: "Test Product 2",
        description: "Test Description 2",
        price: 200,
        stock: 20,
        images: ["test2.jpg"],
        category: "Category 2",
      },
    ],
    loading: false,
    error: null,
  }),
}));

describe("ProductsPage", () => {
  const renderProductsPage = () => {
    return render(
      <BrowserRouter>
        <ProductsPage />
      </BrowserRouter>
    );
  };

  it("should render products", () => {
    renderProductsPage();
    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
  });

  it("should filter products by category", () => {
    renderProductsPage();

    // Click on Category 1 filter
    fireEvent.click(screen.getByText("Category 1"));

    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Product 2")).not.toBeInTheDocument();
  });

  it("should filter products by search query", () => {
    renderProductsPage();

    const searchInput = screen.getByPlaceholderText("Search products...");
    fireEvent.change(searchInput, { target: { value: "Product 1" } });

    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Product 2")).not.toBeInTheDocument();
  });

  it("should show loading state", () => {
    // Override the mock to show loading state
    jest
      .spyOn(require("../../hooks/useProducts"), "useProducts")
      .mockImplementation(() => ({
        products: [],
        loading: true,
        error: null,
      }));

    renderProductsPage();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should show error state", () => {
    // Override the mock to show error state
    jest
      .spyOn(require("../../hooks/useProducts"), "useProducts")
      .mockImplementation(() => ({
        products: [],
        loading: false,
        error: new Error("Test error"),
      }));

    renderProductsPage();
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });
});
