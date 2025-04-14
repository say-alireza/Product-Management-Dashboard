import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../Types/Product";

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

  const filteredProducts = products.filter((product: Product) => {
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
        {error}
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Search and Filter */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control rounded-start"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary rounded-end"
              type="button"
            >
              Search
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex gap-2">
            {categories.map((category: string) => (
              <button
                key={category}
                className={`btn ${
                  selectedCategory === category
                    ? "btn-primary"
                    : "btn-outline-primary"
                } rounded-2`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All" : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredProducts.map((product: Product) => (
          <div key={product.id} className="col">
            <div className="card h-100 border-0 shadow-sm">
              <img
                src={product.images[0]}
                className="card-img-top"
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h5 mb-0">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </span>
                  <span
                    className={`badge ${
                      product.stock > 0 ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
              <div className="card-footer bg-white border-top-0">
                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-primary w-100 rounded-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
