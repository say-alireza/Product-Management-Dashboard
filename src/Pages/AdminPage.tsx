import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../Types/Product";

export default function AdminPage() {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const handleAddProduct = () => {
    setModalMode("create");
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">در حال بارگذاری...</span>
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
    <div className="admin-dashboard">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded">
        <div>
          <h2 className="mb-0">پنل مدیریت</h2>
          <p className="text-muted mb-0">مدیریت محصولات و موجودی</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddProduct}>
          افزودن محصول جدید
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 bg-primary bg-gradient h-100">
            <div className="card-body text-white">
              <div className="d-flex flex-column">
                <h6 className="card-title mb-3">تعداد کل محصولات</h6>
                <h2 className="card-text mb-0 display-6">{products.length}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 bg-success bg-gradient h-100">
            <div className="card-body text-white">
              <div className="d-flex flex-column">
                <h6 className="card-title mb-3">محصولات موجود</h6>
                <h2 className="card-text mb-0 display-6">
                  {products.filter((p) => p.stock > 0).length}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 bg-danger bg-gradient h-100">
            <div className="card-body text-white">
              <div className="d-flex flex-column">
                <h6 className="card-title mb-3">محصولات ناموجود</h6>
                <h2 className="card-text mb-0 display-6">
                  {products.filter((p) => p.stock === 0).length}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th className="border-0">تصویر</th>
                  <th className="border-0">نام محصول</th>
                  <th className="border-0">دسته‌بندی</th>
                  <th className="border-0">قیمت</th>
                  <th className="border-0">موجودی</th>
                  <th className="border-0">وضعیت</th>
                  <th className="border-0">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="rounded"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "contain",
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>
                      <span className="badge bg-light text-dark">
                        {product.category}
                      </span>
                    </td>
                    <td>
                      {new Intl.NumberFormat("fa-IR", {
                        style: "currency",
                        currency: "IRR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(product.price)}
                    </td>
                    <td>{product.stock}</td>
                    <td>
                      <span
                        className={`badge ${
                          product.stock > 0 ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {product.stock > 0 ? "موجود" : "ناموجود"}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEditProduct(product)}
                        >
                          ویرایش
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalMode === "create"
                    ? "افزودن محصول جدید"
                    : "ویرایش محصول"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">نام محصول</label>
                      <input type="text" className="form-control" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">دسته‌بندی</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">توضیحات</label>
                    <textarea className="form-control" rows={3}></textarea>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">قیمت</label>
                      <div className="input-group">
                        <input type="number" className="form-control" />
                        <span className="input-group-text">تومان</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">موجودی</label>
                      <input type="number" className="form-control" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">تصاویر محصول</label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      accept="image/*"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer border-top-0">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  انصراف
                </button>
                <button type="button" className="btn btn-primary">
                  {modalMode === "create" ? "افزودن" : "ذخیره تغییرات"}
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </div>
      )}
    </div>
  );
}
