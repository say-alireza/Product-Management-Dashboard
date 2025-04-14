import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { Button } from "../components/Button";
import { ProductCard } from "../components/ProductCard";
import { FormInput } from "../components/Form";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || "all"
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const categories = [
    "all",
    ...new Set(products.map((p) => p.category)),
  ] as string[];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        {error?.message || "An error occurred while loading products"}
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
            <Button variant="outline-secondary" className="rounded-start-0">
              Search
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
            <ProductCard product={product} />
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
