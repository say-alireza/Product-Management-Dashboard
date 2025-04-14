import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../Types/Product";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (products.length > 0 && id) {
      const foundProduct = products.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [products, id]);

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
        {error.message || "An error occurred"}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning" role="alert">
          Product not found
        </div>
        <Link to="/products" className="btn btn-primary rounded-2">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/products">Products</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Product Images */}
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm">
            <img
              src={product.images[selectedImage]}
              className="card-img-top p-3"
              alt={product.name}
              style={{ height: "400px", objectFit: "contain" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
            <div className="card-body">
              <div className="d-flex gap-2 overflow-auto">
                {product.images.map((image: string, index: number) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    className={`img-thumbnail ${
                      selectedImage === index ? "border-primary" : ""
                    }`}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                    onClick={() => setSelectedImage(index)}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h1 className="h2 mb-3">{product.name}</h1>
          <div className="mb-3">
            <span className="badge bg-primary me-2">{product.category}</span>
            <span
              className={`badge ${
                product.stock > 0 ? "bg-success" : "bg-danger"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <h2 className="h3 text-primary mb-4">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(product.price)}
          </h2>
          <p className="lead mb-4">{product.description}</p>
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary rounded-2"
              disabled={product.stock === 0}
              onClick={() => alert("Added to cart!")}
            >
              Add to Cart
            </button>
            <Link to="/products" className="btn btn-outline-primary rounded-2">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
