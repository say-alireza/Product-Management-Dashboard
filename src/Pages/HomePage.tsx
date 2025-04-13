import { useState } from "react";
import { useProducts } from "../hooks/useProducts";

export default function HomePage() {
  const { products, loading, error, searchProducts } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<{
    [key: string]: number;
  }>({});

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchProducts(searchQuery);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "/placeholder.svg";
  };

  const toggleImage = (productId: string) => {
    setSelectedImageIndex((prev) => ({
      ...prev,
      [productId]: prev[productId] === 1 ? 0 : 1,
    }));
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col">
          <form onSubmit={handleSearch} className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No products found.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product) => (
            <div key={product.id} className="col">
              <div className="card h-100 shadow-sm">
                <div
                  className="card-img-wrapper position-relative"
                  style={{ height: "300px", cursor: "pointer" }}
                  onClick={() => toggleImage(product.id)}
                >
                  <img
                    src={product.images[selectedImageIndex[product.id] || 0]}
                    alt={product.name}
                    className="card-img-top p-3"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                      backgroundColor: "#f8f9fa",
                      transition: "opacity 0.3s ease-in-out",
                    }}
                    onError={handleImageError}
                  />
                  {product.images.length > 1 && (
                    <div
                      className="position-absolute bottom-0 start-50 translate-middle-x mb-2"
                      style={{ zIndex: 1 }}
                    >
                      <div className="badge bg-dark bg-opacity-75">
                        Click to view more images
                      </div>
                    </div>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title" style={{ minHeight: "3rem" }}>
                    {product.name}
                  </h5>
                  <p className="card-text text-muted small">
                    {product.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="h5 mb-0">
                      ${product.price.toLocaleString()}
                    </span>
                    <div className="badge bg-success">
                      Stock: {product.stock}
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-white">
                  <div className="d-grid">
                    <button className="btn btn-outline-primary">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
