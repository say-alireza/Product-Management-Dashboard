<<<<<<< HEAD

# 🛍️ Product Management Dashboard

![Screenshot](https://github.com/user-attachments/assets/fcb22150-d89a-4f7a-95c3-cf7e503a49c1)

A modern React dashboard for product management with REST API integration.

---

## ✨ Features

- 📋 Product listing with pagination  
- 🔍 Advanced search and filtering  
- ⚙️ Admin panel with CRUD operations  
- 🔄 REST API integration using Axios  
- 📱 Responsive Bootstrap 5 design  
- 🔐 JWT Authentication (optional)  

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- npm v8+
- Backend API endpoint  

---

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/say-alireza/Product-Management-Dashboard.git
cd Product-Management-Dashboard
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file**

> 📌 Important:  
> After installing, you need to create a `.env` file in the project root directory (where `package.json` is) and add your API configuration.

Example `.env` file:

```ini
REACT_APP_API_BASE_URL=https://your-api-endpoint.com
REACT_APP_API_KEY=your_api_key_here
```

4. **Start the development server**

```bash
npm start
```

Your project should now be running locally at `http://localhost:3000`

---

## ⚙️ Configuration

1. Create a `.env` file in the project root (as shown above).

2. Create `src/api/client.js`:

```javascript
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
  }
});

export default apiClient;
```

---

## 🖥️ Development

Start the development server:

```bash
npm start
```

---

## 🏗️ Production

Build and serve your production app:

```bash
npm run build
npm install -g serve
serve -s build
```

---

## 🔌 API Example

Create `src/api/productService.js`:

```javascript
import apiClient from './client';

export default {
  getAllProducts() {
    return apiClient.get('/products');
  },
  createProduct(productData) {
    return apiClient.post('/products', productData);
  },
  updateProduct(id, productData) {
    return apiClient.put(`/products/${id}`, productData);
  },
  deleteProduct(id) {
    return apiClient.delete(`/products/${id}`);
  }
};
```

---

## 🛠️ Troubleshooting

| Issue                  | Solution                          |
|:----------------------|:-----------------------------------|
| API Connection Failed  | Check CORS and endpoint URL        |
| 401 Unauthorized       | Verify API keys/tokens             |
| 404 Not Found          | Validate endpoint paths            |

---

