import { Button } from "../components/Button";

/**
 * Constants for the homepage
 */
const HERO_IMAGE = {
  src: "/images/Shop-Anytime-Anywhere (1).jpg",
  alt: "Online shopping experience",
  fallback: "/placeholder.svg",
};

const HERO_STYLES = {
  image: {
    maxHeight: "400px",
    width: "100%",
    objectFit: "cover" as const,
    objectPosition: "center",
  },
  overlay: {
    background:
      "linear-gradient(45deg, rgba(13,110,253,0.1), rgba(13,110,253,0.05))",
    pointerEvents: "none" as const,
  },
};

/**
 * HomePage component that displays the main landing page
 * @returns JSX.Element
 */
export default function HomePage(): JSX.Element {
  /**
   * Handle image load error by setting fallback image
   */
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = HERO_IMAGE.fallback;
  };

  /**
   * Navigate to products page
   */
  const handleViewProducts = () => {
    window.location.href = "/products";
  };

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
          <Button variant="primary" onClick={handleViewProducts}>
            View Products
          </Button>
        </div>
        <div className="col-md-6">
          <div className="position-relative">
            <img
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              className="img-fluid rounded shadow-lg"
              style={HERO_STYLES.image}
              onError={handleImageError}
            />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 rounded"
              style={HERO_STYLES.overlay}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
