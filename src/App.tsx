import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductsPage from "./Pages/ProductsPage";
import ProductDetail from "./components/ProductDetail";
import AdminPage from "./Pages/AdminPage";
import Navbar from "./components/Navbar";
import { ColorModeProvider } from "./contexts/ColorModeContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles/colorMode.css";
import "./App.css";

function App() {
  return (
    <ColorModeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div dir="rtl">
          <Navbar />
          <main className="py-4">
            <div className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </ColorModeProvider>
  );
}

export default App;
