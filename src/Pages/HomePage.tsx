import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

export default function HomePage() {
  const { loading, error } = useProducts();

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
      {/* Hero Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h1 className="display-4 fw-bold mb-3">Welcome to Our Store</h1>
          <p className="lead text-muted mb-4">
            Complete collection of products with the best quality and affordable
            prices
          </p>
          <div className="d-flex gap-3">
            <Link to="/products" className="btn btn-primary rounded-2">
              View Products
            </Link>
            <Link to="/contact" className="btn btn-outline-primary rounded-2">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src="/hero-image.jpg"
            alt="Hero"
            className="img-fluid rounded shadow-lg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
        </div>
      </div>
    </div>
  );
}
