import { Button } from "../components/Button";

export default function HomePage() {
  return (
    <div className="container py-4">
      {/* Hero Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h1 className="display-4 fw-bold mb-3">Welcome to Our Store</h1>
          <p className="lead text-muted mb-4">
            Discover our complete collection of high-quality products at
            affordable prices. Shop with confidence and enjoy a seamless online
            shopping experience.
          </p>
          <Button
            variant="primary"
            onClick={() => (window.location.href = "/products")}
          >
            View Products
          </Button>
        </div>
        <div className="col-md-6">
          <div className="position-relative">
            <img
              src="/images/Shop-Anytime-Anywhere (1).jpg"
              alt="Online shopping experience"
              className="img-fluid rounded shadow-lg"
              style={{
                maxHeight: "400px",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 rounded"
              style={{
                background:
                  "linear-gradient(45deg, rgba(13,110,253,0.1), rgba(13,110,253,0.05))",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
