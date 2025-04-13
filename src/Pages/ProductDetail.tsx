import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productAPI } from "../services/api";
import { Product } from "../Types/Product";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (!id) throw new Error("Product ID is required");
        const data = await productAPI.getById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    alert(`Added ${quantity} item(s) to cart`);
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error || "Product not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Image Gallery */}
        <div className="col-md-6 mb-4">
          <div className="position-relative" style={{ minHeight: "400px" }}>
            <img
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className="img-fluid rounded shadow"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "contain",
                backgroundColor: "#f8f9fa",
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
          {/* Thumbnail Gallery */}
          <div className="d-flex mt-3 gap-2 overflow-auto">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} - view ${index + 1}`}
                className={`rounded cursor-pointer ${
                  selectedImageIndex === index ? "border border-primary" : ""
                }`}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedImageIndex(index)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="col-md-6">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none">
                  {product.category}
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          <h1 className="mb-4">{product.name}</h1>

          <div className="mb-4">
            <span className="h2 text-primary">
              {new Intl.NumberFormat("fa-IR", {
                style: "currency",
                currency: "IRR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(product.price)}
            </span>
          </div>

          <div className="mb-4">
            <div className="d-flex align-items-center gap-2">
              <div
                className={`badge ${
                  product.stock > 0 ? "bg-success" : "bg-danger"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </div>
              {product.rating && (
                <div className="d-flex align-items-center">
                  <i className="bi bi-star-fill text-warning"></i>
                  <span className="ms-1">{product.rating}</span>
                </div>
              )}
            </div>
          </div>

          <p className="mb-4">{product.description}</p>

          {product.stock > 0 && (
            <div className="d-flex gap-3 align-items-center mb-4">
              <div className="input-group" style={{ width: "150px" }}>
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 1 && value <= product.stock) {
                      setQuantity(value);
                    }
                  }}
                  min="1"
                  max={product.stock}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                >
                  +
                </button>
              </div>
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          )}

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Product Details</h5>
              <table className="table table-borderless mb-0">
                <tbody>
                  <tr>
                    <td className="text-muted">Category:</td>
                    <td>{product.category}</td>
                  </tr>
                  <tr>
                    <td className="text-muted">Stock:</td>
                    <td>{product.stock} units</td>
                  </tr>
                  <tr>
                    <td className="text-muted">Product ID:</td>
                    <td>{product.id}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
