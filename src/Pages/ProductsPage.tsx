import { useProducts } from "../hooks/useProducts";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import ProductDetail from "./ProductDetail";

export default function ProductsPage() {
  const { products, loading, error } = useProducts();
  const location = useLocation();
  const isListView = location.pathname === "/products";

  if (!isListView) {
    return <ProductDetail />;
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
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
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">محصولات</h2>
        <div className="d-flex gap-2">
          <select className="form-select" aria-label="مرتب‌سازی">
            <option>مرتب‌سازی بر اساس</option>
            <option value="price-asc">قیمت: کم به زیاد</option>
            <option value="price-desc">قیمت: زیاد به کم</option>
            <option value="newest">جدیدترین</option>
          </select>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <div className="card h-100 shadow-sm">
              <img
                src={product.images[0]}
                className="card-img-top p-3"
                alt={product.name}
                style={{ height: "200px", objectFit: "contain" }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
              <div className="card-body">
                <h5 className="card-title mb-1">{product.name}</h5>
                <p className="card-text text-muted small mb-2">
                  {product.description}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h5 mb-0">
                    {new Intl.NumberFormat("fa-IR", {
                      style: "currency",
                      currency: "IRR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </span>
                  <span
                    className={`badge ${
                      product.stock > 0 ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {product.stock > 0 ? `موجود: ${product.stock}` : "ناموجود"}
                  </span>
                </div>
              </div>
              <div className="card-footer bg-white border-top-0">
                <div className="d-grid">
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-outline-primary"
                  >
                    مشاهده محصول
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
