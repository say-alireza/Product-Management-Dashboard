import { useState, FormEvent } from "react";
import { useProducts } from "../hooks/useProducts";
import { Product, ProductInput } from "../Types/Product";

export default function AdminPage() {
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [formData, setFormData] = useState<ProductInput>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    images: [],
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProduct = () => {
    setModalMode("create");
    setSelectedProduct(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      images: [],
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
      images: product.images,
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const result = await deleteProduct(id);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you would upload these files to a server
      // For now, we'll create object URLs
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...imageUrls],
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      if (modalMode === "create") {
        const result = await createProduct(formData);
        if (result.success) {
          setIsModalOpen(false);
        } else {
          setFormError(result.error || "Error creating product");
        }
      } else if (selectedProduct) {
        const result = await updateProduct(selectedProduct.id, formData);
        if (result.success) {
          setIsModalOpen(false);
        } else {
          setFormError(result.error || "Error updating product");
        }
      }
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Error submitting data"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="admin-dashboard">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded">
        <div>
          <h2 className="mb-0">Admin Panel</h2>
          <p className="text-muted mb-0">Manage products and inventory</p>
        </div>
        <button
          className="btn btn-primary rounded-2"
          onClick={handleAddProduct}
        >
          Add New Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-0 bg-primary bg-gradient h-100">
            <div className="card-body text-white">
              <div className="d-flex flex-column">
                <h6 className="card-title mb-3">Total Products</h6>
                <h2 className="card-text mb-0 display-6">{products.length}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 bg-success bg-gradient h-100">
            <div className="card-body text-white">
              <div className="d-flex flex-column">
                <h6 className="card-title mb-3">In Stock Products</h6>
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
                <h6 className="card-title mb-3">Out of Stock Products</h6>
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
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
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
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
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
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
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

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div
          className="modal show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
          tabIndex={-1}
        >
          <div className="modal-dialog modal-lg" style={{ marginTop: "2rem" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalMode === "create" ? "Add New Product" : "Edit Product"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  {formError && (
                    <div className="alert alert-danger">{formError}</div>
                  )}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Product Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Category</label>
                      <input
                        type="text"
                        className="form-control"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      required
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Stock</label>
                      <input
                        type="number"
                        className="form-control"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Product Images</label>
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                    />
                    {formData.images.length > 0 && (
                      <div className="d-flex gap-2 mt-2 overflow-auto">
                        {formData.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="img-thumbnail"
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Saving...
                      </>
                    ) : modalMode === "create" ? (
                      "Add Product"
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
