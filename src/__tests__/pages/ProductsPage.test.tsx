import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductsPage from "../../Pages/ProductsPage";
import { ColorModeProvider } from "../../contexts/ColorModeContext";
import axios from "axios";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("ProductsPage", () => {
  const mockProducts = [
    {
      id: 1,
      title: "Test Product 1",
      description: "Test Description 1",
      price: 100,
      category: "Category 1",
      image: "test1.jpg",
      rating: { rate: 4.5, count: 100 },
    },
    {
      id: 2,
      title: "Test Product 2",
      description: "Test Description 2",
      price: 200,
      category: "Category 2",
      image: "test2.jpg",
      rating: { rate: 4.0, count: 50 },
    },
  ];

  const renderProductsPage = () => {
    return render(
      <BrowserRouter>
        <ColorModeProvider>
          <ProductsPage />
        </ColorModeProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render products", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });
    renderProductsPage();

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText("Test Product 1")).toBeInTheDocument();
      expect(screen.getByText("Test Product 2")).toBeInTheDocument();
    });
  });

  it("should filter products by category", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });
    renderProductsPage();

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    });

    // Click on Category 1 filter
    fireEvent.click(screen.getByText("Category 1"));

    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Product 2")).not.toBeInTheDocument();
  });

  it("should filter products by search query", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });
    renderProductsPage();

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search products...");
    fireEvent.change(searchInput, { target: { value: "Product 1" } });

    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Product 2")).not.toBeInTheDocument();
  });

  it("should show loading state", () => {
    mockedAxios.get.mockImplementationOnce(() => new Promise(() => {}));
    renderProductsPage();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should show error state", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Test error"));
    renderProductsPage();

    await waitFor(() => {
      expect(screen.getByText("Test error")).toBeInTheDocument();
    });
  });

  it("should clear search when clear button is clicked", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockProducts });
    renderProductsPage();

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search products...");
    fireEvent.change(searchInput, { target: { value: "Product 1" } });

    // Clear search
    const clearButton = screen.getByLabelText("Clear search");
    fireEvent.click(clearButton);

    expect(searchInput).toHaveValue("");
  });
});
