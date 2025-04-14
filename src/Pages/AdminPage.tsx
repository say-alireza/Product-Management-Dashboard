import { useState, FormEvent } from "react";
import { useProducts } from "../hooks/useProducts";
import { Product, ProductInput } from "../Types/Product";
import { Modal } from "../components/Modal";
import { Button } from "../components/Button";
import { FormInput, FormTextArea, FormFileInput } from "../components/Form";
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
        <Button variant="primary" onClick={handleAddProduct}>
          Add New Product
        </Button>
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

      {/* Products Grid */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <ProductCard
              product={product}
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
          <>
            <Button
              variant="outline-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" isLoading={isSubmitting}>
              {modalMode === "create" ? "Add Product" : "Save Changes"}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          {formError && <div className="alert alert-danger">{formError}</div>}
          <div className="row mb-3">
            <div className="col-md-6">
              <FormInput
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6">
              <FormInput
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <FormTextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            required
          />
          <div className="row mb-3">
            <div className="col-md-6">
              <FormInput
                label="Price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="col-md-6">
              <FormInput
                label="Stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>
          </div>
          <FormFileInput
            label="Product Images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            preview={formData.images}
          />
        </form>
      </Modal>
    </div>
  );
}
