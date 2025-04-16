import { useState, FormEvent } from "react";
import { useProducts } from "../hooks/useProducts";
import { Product, ProductInput } from "../Types/Product";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button";
import { FormInput, FormTextArea } from "../components/Form";
import { ProductCard } from "../components/ProductCard";

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
    title: "",
    description: "",
    price: 0,
    category: "",
    image: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [operationError, setOperationError] = useState<string | null>(null);

  const getUniqueCategories = (): string[] => {
    return [...new Set(products.map((product) => product.category))].sort();
  };

  const calculateAverageRating = (products: Product[]): string => {
    if (products.length === 0) return "0.0";
    const totalRating = products.reduce(
      (acc: number, p: Product) => acc + (p.rating?.rate || 0),
      0
    );
    return (totalRating / products.length).toFixed(1);
  };

  const calculateTotalReviews = (products: Product[]): number => {
    return products.reduce(
      (acc: number, p: Product) => acc + (p.rating?.count || 0),
      0
    );
  };

  const handleAddProduct = () => {
    setModalMode("create");
    setSelectedProduct(null);
    setFormData({
      title: "",
      description: "",
      price: 0,
      category: "",
      image: "",
    });
    setFormError(null);
    setOperationError(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
    });
    setFormError(null);
    setOperationError(null);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setOperationError(null);
        const success = await deleteProduct(id);
        if (!success) {
          setOperationError("Failed to delete product");
        }
      } catch (err) {
        setOperationError(
          err instanceof Error ? err.message : "Error deleting product"
        );
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setOperationError(null);
    setIsSubmitting(true);

    try {
      if (modalMode === "create") {
        await createProduct(formData);
        setIsModalOpen(false);
      } else if (selectedProduct) {
        await updateProduct(selectedProduct.id, formData);
        setIsModalOpen(false);
      }

      // Reset form data after successful submission
      setFormData({
        title: "",
        category: "",
        price: 0,
        image: "",
        description: "",
      });
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
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Products</h4>
          <p>{error.message || "An error occurred while loading products"}</p>
          <hr />
          <p className="mb-0">
            Please try again later or contact support if the problem persists.
          </p>
        </div>
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
        <Button variant="primary" onClick={handleAddProduct}>
          Add New Product
        </Button>
      </div>

      {/* Operation Error Display */}
      {operationError && (
        <div
          className="alert alert-danger alert-dismissible fade show mb-4"
          role="alert"
        >
          {operationError}
          <button
            type="button"
            className="btn-close"
            onClick={() => setOperationError(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

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
                <h6 className="card-title mb-3">Average Rating</h6>
                <h2 className="card-text mb-0 display-6">
                  {calculateAverageRating(products)}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 bg-info bg-gradient h-100">
            <div className="card-body text-white">
              <div className="d-flex flex-column">
                <h6 className="card-title mb-3">Total Reviews</h6>
                <h2 className="card-text mb-0 display-6">
                  {calculateTotalReviews(products)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map((product: Product) => (
          <div key={product.id} className="col">
            <ProductCard
              productId={product.id}
              isAdmin={true}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </div>
        ))}
      </div>

      {/* Product Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "create" ? "Add New Product" : "Edit Product"}
        footer={
          <Button
            variant="outline-secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
        }
      >
        <form onSubmit={handleSubmit}>
          {formError && (
            <div className="alert alert-danger">
              <p className="mb-0">{formError}</p>
            </div>
          )}
          <div className="row mb-3">
            <div className="col-md-6">
              <FormInput
                label="Product Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  {getUniqueCategories().map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <FormInput
                label="Price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <FormInput
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <FormTextArea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
            />
          </div>
          <div className="text-end">
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {modalMode === "create" ? "Add Product" : "Save Changes"}
            </Button>
          </div>
        </form>
      </Modal>

      <style>
        {`
          .btn-close {
            margin-right: 0.2rem;
          }
        `}
      </style>
    </div>
  );
}
