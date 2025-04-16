import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Product } from "../Types/Product";
import axios from "axios";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((response) => {
          // Transform the API response to match our Product type
          const apiProduct = response.data;
          const transformedProduct: Product = {
            id: apiProduct.id.toString(),
            title: apiProduct.title,
            price: apiProduct.price,
            description: apiProduct.description,
            category: apiProduct.category,
            image: apiProduct.image,
            rating: apiProduct.rating,
          };
          setProduct(transformedProduct);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || "Failed to load product");
          setLoading(false);
        });
    };

    fetchProduct();
  }, [id]);

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
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Product</h4>
          <p>{error}</p>
          <hr />
          <Link to="/products" className="btn btn-primary rounded-2">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-4">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Product Not Found</h4>
          <p>The requested product could not be found.</p>
          <hr />
          <Link to="/products" className="btn btn-primary rounded-2">
            Back to Products
          </Link>
        </div>
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
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Product Image */}
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm">
            <img
              src={product.image}
              className="card-img-top p-3"
              alt={product.title}
              style={{ height: "400px", objectFit: "contain" }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h1 className="h2 mb-3">{product.title}</h1>
          <div className="mb-3">
            <span className="badge bg-primary ms-2 me-2">{product.category}</span>
            <span
              className={`badge ${
                (product.rating?.count || 0) > 0 ? "bg-success" : "bg-danger"
              }`}
            >
              {(product.rating?.count || 0) > 0 ? "In Stock" : "Out of Stock"}
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
              disabled={(product.rating?.count || 0) === 0}
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
