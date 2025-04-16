import { Button } from "../components/Button";

export default function HomePage() {
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
          <Button
            variant="primary"
            onClick={() => (window.location.href = "/products")}
          >
            View Products
          </Button>
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
