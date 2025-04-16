import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product } from "../Types/Product";
import axios from "axios";

interface ProductCardProps {
  productId: string;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  onEdit,
  onDelete,
  isAdmin = false,
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      setError(null);

      axios
        .get(`https://fakestoreapi.com/products/${productId}`)
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
  }, [productId]);

  if (loading) {
    return (
      <div className="card h-100 border-0 shadow-sm">
        <div className="card-body d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="card h-100 border-0 shadow-sm">
        <div className="card-body d-flex justify-content-center align-items-center">
          <div className="text-danger">{error || "Product not found"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="card h-100 border-0 shadow-sm">
      <img
        src={product.image}
        className="card-img-top"
        alt={product.title}
        style={{ height: "200px", objectFit: "cover" }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/placeholder.svg";
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-truncate">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="h5 mb-0">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(product.price)}
          </span>
          <span className="badge bg-primary">{product.category}</span>
        </div>
        {product.rating && (
          <div className="d-flex align-items-center mb-2">
            <div className="me-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <i
                  key={star}
                  className={`bi bi-star${
                    star <= Math.round(product.rating!.rate) ? "-fill" : ""
                  } text-warning`}
                ></i>
              ))}
            </div>
            <small className="text-muted">
              ({product.rating.count} reviews)
            </small>
          </div>
        )}
        <div className="d-flex gap-2">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-primary flex-grow-1"
          >
            View Details
          </Link>
          {isAdmin && (
            <>
              <button
                className="btn btn-outline-primary"
                onClick={() => onEdit?.(product)}
              >
                Edit
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDelete?.(product.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
