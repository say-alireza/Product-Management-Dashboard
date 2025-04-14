import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../Types/Product";

interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  isAdmin = false,
}) => {
  return (
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
          <span
            className={`badge ${
              product.stock > 0 ? "bg-success" : "bg-danger"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>
        <div className="d-flex align-items-center mb-2">
          <div className="me-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`bi bi-star${
                  star <= Math.round(product.rating) ? "-fill" : ""
                } text-warning`}
              ></i>
            ))}
          </div>
          <small className="text-muted">({product.rating})</small>
        </div>
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
