import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../components/Button";
import { ProductCard } from "../components/ProductCard";
import { FormInput } from "../components/Form";
import { Product } from "../Types/Product";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "all"
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    const fetchProducts = () => {
      setLoading(true);
      setError(null);

      axios
        .get("https://fakestoreapi.com/products")
        .then((response) => {
          // Transform the API response to match our Product type
          const transformedProducts = response.data.map(
            (apiProduct: any): Product => ({
              id: apiProduct.id.toString(),
              title: apiProduct.title,
              price: apiProduct.price,
              description: apiProduct.description,
              category: apiProduct.category,
              image: apiProduct.image,
              rating: apiProduct.rating,
            })
          );
          setProducts(transformedProducts);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || "Failed to load products");
          setLoading(false);
        });
    };

    fetchProducts();
  }, []);

  const categories = [
    "all",
    ...new Set(products.map((p) => p.category)),
  ] as string[];

  const filteredProducts = (products || []).filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearch = () => {
    // This function is called when the search button is clicked
    // The search is already happening in real-time as the user types
    // This is just for the button click event
    console.log("Searching for:", searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Search and Filter */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="input-group">
            <FormInput
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="rounded-end-0"
            />
            {searchQuery && (
              <Button
                variant="outline-secondary"
                className="rounded-0"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <i className="bi bi-x-lg"></i>
              </Button>
            )}
            <Button
              variant="primary"
              className="rounded me-2"
              onClick={handleSearch}
            >
              <i className="bi bi-search me-1"></i> Search
            </Button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={
                  selectedCategory === category ? "primary" : "outline-primary"
                }
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All" : category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col">
            <ProductCard productId={product.id} />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-5">
          <h3 className="text-muted">No products found</h3>
          <Button
            variant="outline-primary"
            className="mt-3"
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
